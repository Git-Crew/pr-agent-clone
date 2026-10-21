import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  // Null for accounts created through "Sign in with GitHub".
  passwordHash: text("password_hash"),
  githubId: bigint("github_id", { mode: "number" }).unique(),
  githubLogin: varchar("github_login", { length: 100 }),
  avatarUrl: text("avatar_url"),
  role: varchar("role", { length: 20 }).notNull().default("member"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  razorpayCustomerId: text("razorpay_customer_id").unique(),
  razorpaySubscriptionId: text("razorpay_subscription_id").unique(),
  razorpayPlanId: text("razorpay_plan_id"),
  planName: varchar("plan_name", { length: 50 }),
  subscriptionStatus: varchar("subscription_status", { length: 20 }),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  role: varchar("role", { length: 50 }).notNull(),
  joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 45 }),
});

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  invitedBy: integer("invited_by")
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp("invited_at", { withTimezone: true }).notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
});

// ---------------------------------------------------------------------------
// GitHub App, agents and runs (see docs/ARCHITECTURE.md §5)
// ---------------------------------------------------------------------------

export type RunStatus = "queued" | "running" | "completed" | "cancelled";
export type StepStatus = "pending" | "queued" | "running" | "completed" | "skipped" | "cancelled";
export type Conclusion = "success" | "failure" | "neutral" | "cancelled" | "skipped";
export type AgentKind = "builtin" | "http";
/** When a step runs: on every push, only when the PR is opened, or while the PR has a label. */
export type StepTrigger = "every_push" | "opened" | "label";
/** How strict a failing agent is: comment only, or also request changes. Blocking the merge is `blocking`. */
export type ReviewMode = "comment" | "request_changes";
/** How chatty: inline comments on lines, or one summary comment. */
export type CommentStyle = "inline" | "summary";
export type LogLevel = "info" | "warn" | "error";

/** A GitHub App installation: one user or organization account. This is the tenant. */
export const installations = pgTable("installations", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  accountId: bigint("account_id", { mode: "number" }).notNull(),
  accountLogin: varchar("account_login", { length: 100 }).notNull(),
  accountType: varchar("account_type", { length: 20 }).notNull(),
  accountAvatarUrl: text("account_avatar_url"),
  suspendedAt: timestamp("suspended_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Which signed-in users can see which installations (synced from GET /user/installations). */
export const installationMembers = pgTable(
  "installation_members",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    installationId: bigint("installation_id", { mode: "number" })
      .notNull()
      .references(() => installations.id, { onDelete: "cascade" }),
    syncedAt: timestamp("synced_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.installationId] })],
);

export const repositories = pgTable(
  "repositories",
  {
    id: bigint("id", { mode: "number" }).primaryKey(),
    installationId: bigint("installation_id", { mode: "number" })
      .notNull()
      .references(() => installations.id, { onDelete: "cascade" }),
    fullName: varchar("full_name", { length: 200 }).notNull(),
    private: boolean("private").notNull().default(false),
    defaultBranch: varchar("default_branch", { length: 255 }).notNull().default("main"),
    enabled: boolean("enabled").notNull().default(true),
    removedAt: timestamp("removed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("repositories_installation_idx").on(t.installationId)],
);

/** Agents users can add to a pipeline. installationId null = built-in, available to everyone. */
export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull().default(""),
  kind: varchar("kind", { length: 20 }).$type<AgentKind>().notNull(),
  endpointUrl: text("endpoint_url"),
  // Encrypted HMAC secret for http agents (see src/lib/crypto).
  signingSecret: text("signing_secret"),
  installationId: bigint("installation_id", { mode: "number" }).references(() => installations.id, {
    onDelete: "cascade",
  }),
  defaultConfig: jsonb("default_config").$type<Record<string, unknown>>().notNull().default({}),
  tagline: text("tagline").notNull().default(""),
  createdBy: integer("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** One agent in a repo's pipeline. Steps with the same stage run in parallel; stages run in order. */
export const pipelineSteps = pgTable(
  "pipeline_steps",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    repositoryId: bigint("repository_id", { mode: "number" })
      .notNull()
      .references(() => repositories.id, { onDelete: "cascade" }),
    agentId: uuid("agent_id")
      .notNull()
      .references(() => agents.id, { onDelete: "cascade" }),
    stage: integer("stage").notNull().default(1),
    position: integer("position").notNull().default(0),
    enabled: boolean("enabled").notNull().default(true),
    blocking: boolean("blocking").notNull().default(false),
    includePaths: text("include_paths").array().notNull().default([]),
    excludePaths: text("exclude_paths").array().notNull().default([]),
    branches: text("branches").array().notNull().default([]),
    runOnDrafts: boolean("run_on_drafts").notNull().default(false),
    runOnForks: boolean("run_on_forks").notNull().default(true),
    trigger: varchar("trigger", { length: 20 }).$type<StepTrigger>().notNull().default("every_push"),
    triggerLabel: varchar("trigger_label", { length: 50 }),
    reviewMode: varchar("review_mode", { length: 20 }).$type<ReviewMode>().notNull().default("comment"),
    commentStyle: varchar("comment_style", { length: 10 }).$type<CommentStyle>().notNull().default("inline"),
    maxComments: integer("max_comments").notNull().default(30),
    config: jsonb("config").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("pipeline_steps_repository_idx").on(t.repositoryId)],
);

/** One pipeline execution for one PR head commit. */
export const runs = pgTable(
  "runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    repositoryId: bigint("repository_id", { mode: "number" })
      .notNull()
      .references(() => repositories.id, { onDelete: "cascade" }),
    prNumber: integer("pr_number").notNull(),
    prTitle: text("pr_title").notNull().default(""),
    prAuthor: varchar("pr_author", { length: 100 }).notNull().default(""),
    prUrl: text("pr_url").notNull().default(""),
    headSha: varchar("head_sha", { length: 40 }).notNull(),
    baseSha: varchar("base_sha", { length: 40 }).notNull(),
    headRef: varchar("head_ref", { length: 255 }).notNull(),
    baseRef: varchar("base_ref", { length: 255 }).notNull(),
    isFork: boolean("is_fork").notNull().default(false),
    trigger: varchar("trigger", { length: 40 }).notNull(),
    status: varchar("status", { length: 20 }).$type<RunStatus>().notNull().default("queued"),
    conclusion: varchar("conclusion", { length: 20 }).$type<Conclusion>(),
    currentStage: integer("current_stage").notNull().default(0),
    error: text("error"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
  },
  (t) => [index("runs_repository_pr_idx").on(t.repositoryId, t.prNumber), index("runs_created_at_idx").on(t.createdAt)],
);

export const runSteps = pgTable(
  "run_steps",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    runId: uuid("run_id")
      .notNull()
      .references(() => runs.id, { onDelete: "cascade" }),
    pipelineStepId: uuid("pipeline_step_id").references(() => pipelineSteps.id, { onDelete: "set null" }),
    // Kept nullable so removing an agent keeps its past runs (agent_slug/agent_name hold the snapshot).
    agentId: uuid("agent_id").references(() => agents.id, { onDelete: "set null" }),
    agentSlug: varchar("agent_slug", { length: 64 }).notNull(),
    agentName: varchar("agent_name", { length: 100 }).notNull(),
    stage: integer("stage").notNull(),
    blocking: boolean("blocking").notNull().default(false),
    reviewMode: varchar("review_mode", { length: 20 }).$type<ReviewMode>().notNull().default("comment"),
    commentStyle: varchar("comment_style", { length: 10 }).$type<CommentStyle>().notNull().default("inline"),
    maxComments: integer("max_comments").notNull().default(30),
    config: jsonb("config").$type<Record<string, unknown>>().notNull().default({}),
    // Changed files (repo-relative, not removed) this step should look at, after its path rules.
    targetFiles: text("target_files").array().notNull().default([]),
    status: varchar("status", { length: 20 }).$type<StepStatus>().notNull().default("pending"),
    conclusion: varchar("conclusion", { length: 20 }).$type<Conclusion>(),
    skipReason: text("skip_reason"),
    checkRunId: bigint("check_run_id", { mode: "number" }),
    reviewId: bigint("review_id", { mode: "number" }),
    title: text("title"),
    summary: text("summary"),
    result: jsonb("result").$type<Record<string, unknown>>(),
    metrics: jsonb("metrics").$type<Record<string, string | number>>(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("run_steps_run_idx").on(t.runId)],
);

export const runLogs = pgTable(
  "run_logs",
  {
    id: serial("id").primaryKey(),
    runId: uuid("run_id")
      .notNull()
      .references(() => runs.id, { onDelete: "cascade" }),
    stepId: uuid("step_id").references(() => runSteps.id, { onDelete: "cascade" }),
    level: varchar("level", { length: 10 }).$type<LogLevel>().notNull().default("info"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("run_logs_run_idx").on(t.runId)],
);

/** Encrypted secrets. repositoryId null = available to every repo in the installation. */
export const secrets = pgTable(
  "secrets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    installationId: bigint("installation_id", { mode: "number" })
      .notNull()
      .references(() => installations.id, { onDelete: "cascade" }),
    repositoryId: bigint("repository_id", { mode: "number" }).references(() => repositories.id, {
      onDelete: "cascade",
    }),
    name: varchar("name", { length: 100 }).notNull(),
    value: text("value").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("secrets_scope_name_unique").on(t.installationId, t.repositoryId, t.name).nullsNotDistinct()],
);

/** X-GitHub-Delivery ids we have processed, so redelivered webhooks are ignored. */
export const webhookDeliveries = pgTable("webhook_deliveries", {
  id: varchar("id", { length: 64 }).primaryKey(),
  event: varchar("event", { length: 64 }).notNull(),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * GitHub App credentials created through the one-click setup (App manifest flow). A single row (id = 1).
 * Secrets are encrypted with ENCRYPTION_KEY. GITHUB_APP_* environment variables, when set, take precedence.
 */
export const appConfig = pgTable("app_config", {
  id: integer("id").primaryKey().default(1),
  appId: varchar("app_id", { length: 32 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  clientId: varchar("client_id", { length: 100 }).notNull(),
  clientSecret: text("client_secret").notNull(),
  privateKey: text("private_key").notNull(),
  webhookSecret: text("webhook_secret").notNull(),
  htmlUrl: text("html_url").notNull(),
  ownerLogin: varchar("owner_login", { length: 100 }),
  createdBy: integer("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const installationsRelations = relations(installations, ({ many }) => ({
  repositories: many(repositories),
  members: many(installationMembers),
}));

export const installationMembersRelations = relations(installationMembers, ({ one }) => ({
  user: one(users, { fields: [installationMembers.userId], references: [users.id] }),
  installation: one(installations, {
    fields: [installationMembers.installationId],
    references: [installations.id],
  }),
}));

export const repositoriesRelations = relations(repositories, ({ one, many }) => ({
  installation: one(installations, { fields: [repositories.installationId], references: [installations.id] }),
  pipelineSteps: many(pipelineSteps),
  runs: many(runs),
}));

export const pipelineStepsRelations = relations(pipelineSteps, ({ one }) => ({
  repository: one(repositories, { fields: [pipelineSteps.repositoryId], references: [repositories.id] }),
  agent: one(agents, { fields: [pipelineSteps.agentId], references: [agents.id] }),
}));

export const runsRelations = relations(runs, ({ one, many }) => ({
  repository: one(repositories, { fields: [runs.repositoryId], references: [repositories.id] }),
  steps: many(runSteps),
  logs: many(runLogs),
}));

export const runStepsRelations = relations(runSteps, ({ one }) => ({
  run: one(runs, { fields: [runSteps.runId], references: [runs.id] }),
  agent: one(agents, { fields: [runSteps.agentId], references: [agents.id] }),
}));

export const runLogsRelations = relations(runLogs, ({ one }) => ({
  run: one(runs, { fields: [runLogs.runId], references: [runs.id] }),
}));

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type Installation = typeof installations.$inferSelect;
export type Repository = typeof repositories.$inferSelect;
export type Agent = typeof agents.$inferSelect;
export type PipelineStep = typeof pipelineSteps.$inferSelect;
export type NewPipelineStep = typeof pipelineSteps.$inferInsert;
export type Run = typeof runs.$inferSelect;
export type RunStep = typeof runSteps.$inferSelect;
export type RunLog = typeof runLogs.$inferSelect;
export type Secret = typeof secrets.$inferSelect;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, "id" | "name" | "email">;
  })[];
};

export enum ActivityType {
  SIGN_UP = "SIGN_UP",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
  CREATE_TEAM = "CREATE_TEAM",
  REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER",
  INVITE_TEAM_MEMBER = "INVITE_TEAM_MEMBER",
  ACCEPT_INVITATION = "ACCEPT_INVITATION",
}
