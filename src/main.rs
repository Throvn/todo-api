mod db;
mod req_parser;

use std::{
    io::Write,
    net::{TcpListener, TcpStream},
    thread,
};

use req_parser::Request;

fn send_res(mut stream: TcpStream, message: &str) {
    match stream.write(message.as_bytes()) {
        Ok(_) => println!("Answered Correctly"),
        Err(e) => println!("Could not answer: {e}"),
    }
}

fn handle_req(stream: TcpStream) {
    let req = Request::new(&stream);
    println!("Request: {req:?}");
    println!("Method: {}", req.method);
    if req.method != "GET" {
        send_res(stream, "{error: \"404\"}");
        return;
    }

    let answer = match req.path.as_str() {
        "/" => "<welcome to the homepage>",
        "/hello" => "hello, world!",
        _ => "404: Not Found",
    };

    send_res(stream, answer);
}

fn main() {
    println!("Booting up ToDo API...");

    let listener: TcpListener = TcpListener::bind("127.0.0.1:3000").unwrap();
    let mut i = 0;
    for req in listener.incoming() {
        match req {
            Ok(req) => {
                i += 1;
                thread::spawn(|| handle_req(req));
                println!("{i}");
            }
            Err(e) => {
                println!("Could not process incoming request: {e}");
            }
        }
    }
}
