const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: "first"
},{
    text: "second"
}]

beforeEach((done) => {
    Todo.deleteMany({}).then(()=> {
        Todo.insertMany(todos)
    }).then(() => done())
})

describe("POST /todos", () => {
    it('should create new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();

            }).catch((err) => {
                console.error(err);
                
            })
        })
    })

    it('shpuld not create todo with invalid body data', (done) => {
        const text = '';
        request(app)
        .post('/todos')
        .send({text})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done()
            }).catch((err) => {
                done(err);
            })
        })
    })

    describe('GET /todos', () => {
        it('should get all todos', (done) => {
            request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
        })
    })
    describe('GET /todos/:id', () => {
        it('should return 404 if todo not found', (done) => {
            request(app)
            .get('/todos/5c1e1515ae4c3d051e09d8391256')
            .expect(404)
            .end(done)
        })

        it('should retyrn 404 for non-object ids', (done) => {
            request(app)
            .get('/todos/5c1e1515ae4')
            .expect(404)
            .end(done)
        })
    })
})