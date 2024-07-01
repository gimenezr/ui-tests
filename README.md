# UI tests

1. Create the docker image

```bash
docker buildx build . -t ui-tests
```

2. Run the docker image with the tests

```bash
docker run -it  ui-test:latest
```
