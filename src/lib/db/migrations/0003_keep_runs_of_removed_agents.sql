ALTER TABLE "run_steps" DROP CONSTRAINT "run_steps_agent_id_agents_id_fk";
--> statement-breakpoint
ALTER TABLE "run_steps" ALTER COLUMN "agent_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "run_steps" ADD CONSTRAINT "run_steps_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE set null ON UPDATE no action;