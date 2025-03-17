<!-- https://tailwindcss.com/docs/ -->

Learning Svelte 5 With Tailwindcss and Pocketbase

# Deploy

```shell
git clone https://github.com/mewmewlab/memo
```

- 1. Docker compose
```shell
cd hack
docker compose up -d
```

- 2. Kubectl
```shell
cd hack/k8s
kubectl apply -f .
```

- 3. Helm
```shell
cd hack/k8s/helm
helm install memo .
```