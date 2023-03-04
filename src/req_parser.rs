use std::{
    collections::HashMap,
    io::{BufRead, Lines, Read},
    net::TcpStream,
};

#[derive(Debug)]
pub struct Request {
    pub method: String,
    pub path: String,
    pub protocol: String,
    pub headers: HashMap<String, String>,
}

impl Request {
    pub fn new(stream: &TcpStream) -> Self {
        println!("Created new Reqest Object!");

        let mut payload = [0u8; 4096];
        stream
            .clone()
            .read(&mut payload)
            .expect("Could not read request: {e}");

        let mut payload = payload.lines();

        let line = payload.next().expect("Payload empty.");
        let line = line.expect("Request empty.");

        let (method, path, protocol) = get_protocol_info(&line);

        let headers = get_http_headers(payload);

        return Request {
            method,
            path,
            protocol,
            headers,
        };
    }
}

fn get_protocol_info(line: &str) -> (String, String, String) {
    let mut tokens = line.clone().split_whitespace();

    let method = tokens
        .next()
        .expect("Could not retrieve request method.")
        .to_uppercase();
    let path = tokens
        .next()
        .expect("Could not retrieve requested path.")
        .to_string();
    let protocol = tokens
        .next()
        .expect("Could not retrieve request protocol")
        .to_string();

    return (method, path, protocol);
}

fn get_http_headers(payload: Lines<&[u8]>) -> HashMap<String, String> {
    let mut headers: HashMap<String, String> = HashMap::new();
    for line in payload {
        let line = line.expect("Could not read header line.");

        let mut raw_header_values = line.split(": ");
        let header_name = raw_header_values
            .next()
            .expect("Could not read header name.");

        let mut header_value: String = String::new();
        for val_artifacts in raw_header_values {
            header_value.push_str(val_artifacts);
        }

        if header_name.is_empty() || header_value.is_empty() {
            continue;
        }

        headers.insert(header_name.to_string(), header_value);
    }

    return headers;
}
