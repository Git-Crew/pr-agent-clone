CREATE TABLE "agent_phases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"run_id" uuid NOT NULL,
	"step_id" uuid,
	"repository_id" bigint NOT NULL,
	"agent_slug" varchar(64) NOT NULL,
	"agent_name" varchar(100) NOT NULL,
	"phase" varchar(40) NOT NULL,
	"outcome" varchar(20) NOT NULL,
	"model" varchar(120),
	"input_tokens" integer DEFAULT 0 NOT NULL,
	"output_tokens" integer DEFAULT 0 NOT NULL,
	"duration_ms" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "agent_phases" ADD CONSTRAINT "agent_phases_run_id_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."runs"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "agent_phases" ADD CONSTRAINT "agent_phases_step_id_run_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."run_steps"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "agent_phases" ADD CONSTRAINT "agent_phases_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "agent_phases_created_idx" ON "agent_phases" USING btree ("created_at");
--> statement-breakpoint
CREATE INDEX "agent_phases_repository_idx" ON "agent_phases" USING btree ("repository_id");
