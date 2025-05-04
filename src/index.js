import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const server = fastify({
    logger: true,
});

server.register(fastifyCors);
await server.register(fastifySwagger);
await server.register(fastifySwaggerUi);

const books = [
    {
        title: 'Macbeth',
        author: 'W. Shakespeare',
        isbn: 111,
    },
    {
        title: 'Alice`s adventures in Wonderland',
        author: 'L. Carroll',
        isbn: 222,
    },
    {
        title: 'The Great Gatsby',
        author: 'S. Fitzgerald',
        isbn: 333
    },
];

server.get(
    '/book',
    {
        schema: {
            tags: ['Books'],
            description: 'Get books',
            summary: 'Get books',
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            title: {
                                type: 'string',
                            },
                            author: {
                                type: 'string',
                            },
                            isbn: {
                                type: 'number',
                            },
                        },
                        required: ['title', 'author', 'isbn'],
                    },
                },
            },
        },
    },
    function (request, reply) {
        return books;
    },
);

server.post(
    '/book',
    {
        schema: {
            tags: ['Books'],
            description: 'Create book',
            summary: 'Create book',
            body: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        minLength: 4,
                        maxLength: 20,
                    },
                    author: {
                        type: 'string',
                        minLength: 4,
                        maxLength: 20,
                    },
                    isbn: {
                        type: 'number',
                        minimum: 1,
                        maximum: 100000,
                    },
                },
                required: ['title', 'author', 'isbn'],
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                        },
                        author: {
                            type: 'string',
                        },
                        isbn: {
                            type: 'number',
                        },
                    },
                    required: ['title', 'author', 'isbn'],
                },
            },
        },
    },
    function (request, reply) {
        const { title, author, isbn } = request.body;
        const newBook = { title, author, isbn };

        books.push(newBook);

        return newBook;
    },
);

server
    .listen({
        port: 4500,
    })
    .then(function () {
        console.log('server listening');
    });
