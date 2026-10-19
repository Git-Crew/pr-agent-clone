CREATE TABLE "app_config" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"app_id" varchar(32) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"client_id" varchar(100) NOT NULL,
	"client_secret" text NOT NULL,
	"private_key" text NOT NULL,
	"webhook_secret" text NOT NULL,
	"html_url" text NOT NULL,
	"owner_login" varchar(100),
	"created_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app_config" ADD CONSTRAINT "app_config_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;