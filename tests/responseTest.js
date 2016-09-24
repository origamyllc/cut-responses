
/**
 * Created by prashun on 8/16/16.
 */

const request = require('supertest');
const express = require('express');
const app = express();
const expect = require('chai').expect;
const agent = request.agent(app);
const responses = require('../src/index');
let errors = {};

before(()=>{
   errors[404] = {
        'type': 'not_found',
        'message': 'Resource Not Found',
        'details': { '404': true },
        'status': 404,
        'errorCode': 1200,
        'isAppError': true
    };
    errors[500] = {
           'type': 'internal_server_error',
           'message': 'Bad Implementation',
           'details': { '500': true },
           'status': 500,
           'errorCode': 1200,
           'isAppError': true
       }
    errors[401] = {
        "type":"unauthorized",
        "message":"Unauthorized",
        'details': { '401': true },
        'status': 401,
        'errorCode': 1200,
        'isAppError': true
    }
});

describe('1. it should be able to return response', () => {

    it('1.1 should be able to return a 200 response ', (done) => {
        app.get("/200",(req,res)=> {
            responses.send_success_response(res,{200:true});
        });

        agent
            .get('/200')
            .end( (err, res) =>  {
                if (err) return done(err);
                 expect(res.text).to.equals(JSON.stringify({200:true}));
                done()
            });
    });

    it('1.1 should be able to return 404 response ', (done) => {
        app.get("/404",(req,res)=> {
            responses.send_not_found_error(res,{details:{404:true},statusCode:1200});
        });

        agent
            .get('/404')
            .end( (err, res) =>  {
                expect(err).not.to.be.undefined;
                if (err) return done(err);
                expect(res.body.errorCode).to.equals(1200);
                expect(JSON.stringify(res.body.details)).to.equals(JSON.stringify({404:true}));
                expect(res.text).to.equals(JSON.stringify(errors[404]));
                done()
            });
    });

    it('1.2 should be able to return 500 response ', (done) => {
        app.get("/500",(req,res)=> {
            responses.send_internal_server_error(res,{details:{500:true},statusCode:1200});
        });

        agent
            .get('/500')
            .end( (err, res) =>  {
                expect(err).not.to.be.undefined;
                if (err) return done(err);
                expect(res.body.errorCode).to.equals(1200);
                expect(JSON.stringify(res.body.details)).to.equals(JSON.stringify({500:true}));
                expect(res.text).to.equals(JSON.stringify(errors[500]));
                done()
            });
    });

    it('1.2 should be able to return 401 response ', (done) => {
        app.get("/401",(req,res)=> {
            responses.send_unauthorized_error(res,{details:{401:true},statusCode:1200});
        });

        agent
            .get('/401')
            .end( (err, res) =>  {
                expect(err).not.to.be.undefined;
                if (err) return done(err);
                expect(res.body.errorCode).to.equals(1200);
                expect(JSON.stringify(res.body.details)).to.equals(JSON.stringify({401:true}));
                expect(res.text).to.equals(JSON.stringify(errors[401]));
                done()
            });
    });


});
