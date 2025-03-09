build-frontend:
	cd frontend && pnpm run build

build-backend:
	go build backend/main.go -o memo

run-backend:
	go run backend/*.go serve

run-frontend:
	cd frontend && pnpm run dev