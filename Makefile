build-frontend:
	cd frontend && pnpm run build

build-backend:
	go build backend/main.go -o memo

run-backend:
	cd backend && go run main.go serve

run-frontend:
	cd ui && pnpm run dev