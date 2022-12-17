Create TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(240) not null,
	"completed" varchar(1) not null
);