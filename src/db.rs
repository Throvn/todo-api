use mongodb::{options::ClientOptions, Client};
use std::env;

/// **Hello**
pub async fn connect() {
    let mongodb_uri = env::var("MONGODB_URI").expect("[.ENV] MONGODB_URL required.");
    // Parse a connection string into an options struct.
    let client_options = ClientOptions::parse(mongodb_uri).await;
    let mut client_options = client_options.expect("Could not create DB connection.");

    // Manually set an option.
    client_options.app_name = Some("Todo App".to_string());

    // Get a handle to the deployment.
    let client = Client::with_options(client_options).expect("Could not generate Client Options.");

    // List the names of the databases in that deployment.
    for db_name in client
        .list_database_names(None, None)
        .await
        .expect("Could not retrieve db names.")
    {
        println!("{}", db_name);
    }
}
