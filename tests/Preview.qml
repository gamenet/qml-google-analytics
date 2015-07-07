import QtQuick 2.0
import QtTest 1.0

import "../src/analytics.js" as Ga

Rectangle {
    id: root

    width: 800
    height: 600

    Component.onCompleted:  {
        Ga.setTrackingId('UA-19398372-80');
        Ga.setClientId('35009a79-1a05-49d7-b876-2b884d0f825b');

        Ga.setApplicationName('Samle');
        Ga.setApplicationVersion('1.0.0');
        Ga.setApplicationId('vabanaul.gamenet');
        Ga.setApplicationInstallerId('vabanaul.gamenet.vending')

        Ga.setUserId('1234567890');
        Ga.setUserLanguage('ru-RU');
        Ga.setScreenResolution('1280x600');
        Ga.setScreenColors('24-bits');

        Ga.setEndpoint(Ga.debugEndPoint);
    }

    function setText(value) {
        txt.text = JSON.stringify(value).replace(/\\n/g, "\n");
    }

    Column {
        spacing: 10
        anchors.fill: parent

        Row {
            spacing: 10
            width: parent.width
            height: 100

            Button {
                text: "startSession"
                onClicked: Ga.startSession(root.setText);
            }

            Button {
                text: "endSession"
                onClicked: Ga.endSession(root.setText);
            }

            Button {
                text: "trackScreen"
                onClicked: Ga.trackScreen('home',root.setText);
            }

            Button {
                text: "trackEvent"
                onClicked: Ga.trackEvent('button', 'click', 'play', 1, root.setText);
            }

            Button {
                text: "trackException"
                onClicked: Ga.trackException('omg! exception!', 1, root.setText);
            }

            Button {
                text: "trackScial"
                onClicked: Ga.trackSocial('like', 'vk', '/home', root.setText);
            }
        }

        Text {
            id: txt

            wrapMode: Text.WordWrap
            width: parent.width - 100
            height: 300
        }
    }
}
