## Prisma setup

- `yarn add prisma`
- `yarn prisma init --datasource-provider sqlite`
- Define models in prisma/schema.prisma file
- To create DB using the models, run `yarn prisma migrate dev`

## Download the mock data

`business.json` -> `https://drive.google.com/file/d/1QYZQUsauu_TPBS-VthAFDxdsbWx39vlB/edit`
Paste it in `src/mocks/business.json`.
