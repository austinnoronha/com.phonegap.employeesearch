var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
        this.store = new MemoryStore(function() {
            app.renderHomeView();
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    renderHomeView: function() {
        var html =
            "<div class='header'><h1>Employee Search:</h1></div>" +
                "<div class='search-view'>" +
                "<label>Search: <input class='search-key'/></label>" +
                "<ul class='employee-list'></ul>" +
                "</div>" +
                "<footer class='footer'>&copy; 2015 Regards Austin</footer>";
        $('body').html(html);
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }

};

app.initialize();