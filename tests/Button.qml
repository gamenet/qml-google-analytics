import QtQuick 2.0

Rectangle {
    property alias text: txt.text

    signal clicked();

    width: 100
    height: 30
    color: "red"

    Text {
        id: txt

        anchors.centerIn: parent
        text: "endSession"
    }

    MouseArea {
        anchors.fill: parent
        onClicked: parent.clicked()
    }
}
