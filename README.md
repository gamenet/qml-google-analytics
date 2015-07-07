# QML support for the Google Measurement Protocol Overview

Google Measurement Protocol Overview
-------------

The [Google Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/) allows developers to make HTTP requests to send raw user interaction data directly to Google Analytics servers. This allows developers to measure how users interact with their business from almost any environment. Developers can then use the Measurement Protocol to:

- Measure user activity in new environments.
- Tie online to offline behavior.
- Send data from both the client and server.

Getting Started
-------------

    import QtQuick 2.0
    import QtTest 1.0
    
    import "analytics.js" as Ga
    
    Rectangle {
        id: root
    
        width: 800
        height: 600
    
        Component.onCompleted:  {
            Ga.setTrackingId('UA-XXXXXXXX-XX');
            Ga.setClientId('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX');
    
            Ga.setApplicationName('Sample');
            Ga.setApplicationVersion('1.0.0');
            Ga.setApplicationId('com.app');
            Ga.setApplicationInstallerId('comm.company');
            
            Ga.setUserLanguage('en-EN');
            Ga.setScreenResolution('1280x600');
            Ga.setScreenColors('24-bits');
            Ga.setEndpoint(Ga.debugEndPoint);
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
                    onClicked: Ga.startSession();
                }
    
                Button {
                    text: "endSession"
                    onClicked: Ga.endSession();
                }
    
                Button {
                    text: "trackScreen"
                    onClicked: Ga.trackScreen('home');
                }
    
                Button {
                    text: "trackEvent"
                    onClicked: Ga.trackEvent('button', 'click', 'play');
                }
    
                Button {
                    text: "trackException"
                    onClicked: Ga.trackException('exception!', true);
                }
    
                Button {
                    text: "trackSocial"
                    onClicked: Ga.trackSocial('like', 'vk', '/home');
                }
            }
        }
    }
