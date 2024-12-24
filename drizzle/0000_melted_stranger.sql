CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"twitter_username" text,
	"twitter_followers" integer,
	"profile_image_url" text,
	"selected_date" timestamp,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX "twitter_username_idx" ON "user" USING btree ("twitter_username");--> statement-breakpoint
CREATE INDEX "selected_date_idx" ON "user" USING btree ("selected_date");