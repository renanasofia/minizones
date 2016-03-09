// Declare the global zone
var zone;



// The zone module
(function() {
    // Initialize the zone unique id counter
    zone_ids = 0;

    // Hook some functions
    // - setTimeout
    var setTimeout_original = setTimeout;
    setTimeout = hookedSetTimeout;

    // - XMLHTTPRequest (TODO)

    // Create initial zone
    zone = new Zone();


    // Functions
    /*
    Hooked version of setTimeout with zones
    */
    function hookedSetTimeout(func, time) {
        // Save zone context upon entering function
        var location = zone;

        // Hook call back function
        var myfunc = function() {
            // Save zone context of current performance
            var current_location = zone;

            // Change zone location
            zone = location;

            // Run callback
            func();

            // Change zone location
            zone = current_location;
        };

        // Run original timeout with hooked callback
        setTimeout_original(myfunc, time);
    }

    /*
    Zone - Represents a single zone
    */
    function Zone() {
        // Initialize zone attributes
        this._attributes = {};

        // Set new zone id
        zone_ids += 1;
        this._id = zone_ids;

        // Get the zone id
        this.get_id = function() {
            return this._id;
        };

        // Set current zone context
        this.set =  function (key, value) {
            this._attributes[key] = value;
        };

        // Get context of current zone
        this.get = function (key) {
            return this._attributes[key];
        };

        // Fork new context from current one. Don't copy the attributes
        this.fork =  function (new_func) {
            // Create a new zone
            zone = new Zone();

            // Run original function
            new_func();

            // Restore zone to "this" zone
            zone = this;
        };
    }
})();