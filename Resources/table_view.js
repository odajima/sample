var win1 = Ti.UI.currentWindow;
var messageButton = Ti.UI.createButton(
    {
            systemButton: Titanium.UI.Android
    }
);
messageButton.addEventListener(
    'click',
    function () {
        var messageWindow = Ti.UI.createWindow(
            {
                url: 'message_window.js',
                title: 'message',
                backgroundColor: '#fff'
            }
        );
        messageWindow.open();
    }
);
win1.rightNavButton = messageButton;

var data = [];
var tableView = Ti.UI.createTableView({
    data:data
});

function updateTimeline (timeline) {
    var currentData = [];
    for (var i=0;i<timeline.length;i++) {
        var tweet = timeline[i];
        var row = Ti.UI.createTableViewRow(
            {
                height: 'auto',
                layout: 'vertical'
            }
        );

        var imageView = Ti.UI.createImageView(
            {
                image: tweet.user.profile_image_url,
                width: 48,
                height: 48,
            }
        );
        row.add(imageView);

        var nameLabel = Ti.UI.createLabel(
            {
                width: 'auto',
                height: 'auto',
                left: 58,
                top: 'auto',
                fontSize: 6,
                fontWeight: 'bold',
                color: '#2b4771'
            }
        );
        nameLabel.text = tweet.user.screen_name;
        row.add(nameLabel);

        var commentLabel = Ti.UI.createLabel(
            {
                width: 'auto',
                left: 58,
                top: 'auto',
                height: 'auto',
                fontSize: 8
            }
        );
        commentLabel.text = tweet.text;
        row.add(commentLabel);

        var dateLabel = Ti.UI.createLabel(
            {
                width: 'auto',
                height: 'auto',
                left: 58,
                top: 'auto',
                fontSize: 6
            }
        );
        dateLabel.text = tweet.created_at;
        row.add(dateLabel);

        currentData.push(row);
    }
    tableView.setData(currentData);
}

var xhr = Ti.Network.createHTTPClient();
var user = 'hatenatech';
var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + user;
xhr.open('GET', url);
xhr.onload = function() {
    var timeline = JSON.parse(this.responseText);
    updateTimeline(timeline);
};
xhr.send();

win.add(tableView);