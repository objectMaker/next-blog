init: up initTable push generate

up:
	docker-compose up -d

initTable:
	docker exec -it postgres psql -U postgres -c "CREATE DATABASE blog_db;"

pull:
	npx prisma db pull

push:
	npx prisma db push

generate:
	npx prisma generate

.PHONY: init up pull push initTable generate