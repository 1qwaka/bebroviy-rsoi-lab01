
module.exports = {
    person: {
        input: 'person-service.yaml',
        output: {
            client: 'zod',
            mode: 'single',
            target: 'src/gen/validation.ts',
            schemas: 'src/gen/schemas',
            override: {
                zod: {
                    generateEachHttpStatus: true,
                    coerce: {
                        query: true,
                        param: true,
                    }
                },
            },
        },
    },
}
