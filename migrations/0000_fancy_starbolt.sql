DO $$ BEGIN
 CREATE TYPE "public"."tenant_grant_response" AS ENUM('open', 'accepted', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"average_amount" integer NOT NULL,
	CONSTRAINT "grants_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grant_matches" (
	"tenant_id" uuid NOT NULL,
	"grant_id" uuid NOT NULL,
	"feedback" text,
	"response" "tenant_grant_response" DEFAULT 'open',
	CONSTRAINT "grant_matches_tenant_id_grant_id_pk" PRIMARY KEY("tenant_id","grant_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grant_matches" ADD CONSTRAINT "grant_matches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grant_matches" ADD CONSTRAINT "grant_matches_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "public"."grants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
