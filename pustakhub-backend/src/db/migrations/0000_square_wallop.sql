CREATE TABLE "book_images" (
	"image_id" bigint PRIMARY KEY NOT NULL,
	"book_id" bigint NOT NULL,
	"image_url" text NOT NULL,
	"image_order" smallint DEFAULT 1,
	"alt_text" varchar(100),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "books" (
	"book_id" bigint PRIMARY KEY NOT NULL,
	"seller_id" bigint NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"exam_type_id" bigint NOT NULL,
	"subject" varchar(50) NOT NULL,
	"price" numeric(10, 2),
	"is_donation" boolean DEFAULT false,
	"condition_rating" smallint,
	"status" varchar(20) DEFAULT 'available',
	"location_city" varchar(50) NOT NULL,
	"view_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"sold_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "exam_types" (
	"exam_type_id" integer PRIMARY KEY NOT NULL,
	"exam_name" varchar(50) NOT NULL,
	"exam_category" varchar(30),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "exam_types_exam_type_id_unique" UNIQUE("exam_type_id"),
	CONSTRAINT "exam_types_exam_name_unique" UNIQUE("exam_name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" bigint PRIMARY KEY NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"name" varchar(100) NOT NULL,
	"city" varchar(50) NOT NULL,
	"social_media_handle_1" varchar(100),
	"social_media_handle_2" varchar(100),
	"avatar_url" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
ALTER TABLE "book_images" ADD CONSTRAINT "book_images_book_id_books_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("book_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_seller_id_users_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;