ALTER TABLE "agents" ADD COLUMN "tagline" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "pipeline_steps" ADD COLUMN "trigger" varchar(20) DEFAULT 'every_push' NOT NULL;--> statement-breakpoint
ALTER TABLE "pipeline_steps" ADD COLUMN "trigger_label" varchar(50);--> statement-breakpoint
ALTER TABLE "pipeline_steps" ADD COLUMN "review_mode" varchar(20) DEFAULT 'comment' NOT NULL;--> statement-breakpoint
ALTER TABLE "pipeline_steps" ADD COLUMN "comment_style" varchar(10) DEFAULT 'inline' NOT NULL;--> statement-breakpoint
ALTER TABLE "pipeline_steps" ADD COLUMN "max_comments" integer DEFAULT 30 NOT NULL;--> statement-breakpoint
ALTER TABLE "run_steps" ADD COLUMN "review_mode" varchar(20) DEFAULT 'comment' NOT NULL;--> statement-breakpoint
ALTER TABLE "run_steps" ADD COLUMN "comment_style" varchar(10) DEFAULT 'inline' NOT NULL;--> statement-breakpoint
ALTER TABLE "run_steps" ADD COLUMN "max_comments" integer DEFAULT 30 NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;