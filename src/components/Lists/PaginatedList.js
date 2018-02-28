// A paginated list can recieve:
  // - a list of all items to then be paginated (simple)
  // - a list of items from a specific page with a total count
    // - this allows us to request only a certain page's worth of documents from
    //   the server at any given time, instead of requesting a potentially huge list
