Create TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(240) not null,
	"completed" varchar(3) not null
);