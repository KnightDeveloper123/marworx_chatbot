INSERT INTO template (
  id, industry, category, description, node, edges, created_at, status, admin_id
)
VALUES (
  28,
  'EdTech',
  'Student Support',
  'Handles queries about courses, timetables, attendance, etc.',
  '[
  {
    "id": "1",
    "data": {
      "label": "Hi! Welcome to Student Helpdesk"
    },
    "type": "Custom",
    "width": 113,
    "height": 26,
    "dragging": false,
    "position": {
      "x": -64,
      "y": 77.5
    },
    "selected": false,
    "positionAbsolute": {
      "x": -64,
      "y": 77.5
    }
  },
  {
    "id": "3",
    "data": {
      "label": "Here's what I can help you with at school:",
      "targetValues": [
        "Homework & Assignment Bot",
        "Time Table Bot",
        "Exam & Result Bot",
        "Study Material Bot",
        "Leave Application Bot",
        "Event & Holiday Notification Bot",
        "Transport Tracking Bot",
        "Counseling/Support Bot",
        "Library Book Bot"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 422,
    "dragging": false,
    "position": {
      "x": -478.51134033858585,
      "y": 479.995356757996
    },
    "selected": false,
    "positionAbsolute": {
      "x": -478.51134033858585,
      "y": 479.995356757996
    }
  },
  {
    "id": "5",
    "data": {
      "label": "\"? Please select your class to get today?s homework details.\"",
      "targetValues": [
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 278,
    "dragging": false,
    "position": {
      "x": 250.93215643682277,
      "y": -130.42035292911447
    },
    "selected": false,
    "positionAbsolute": {
      "x": 250.93215643682277,
      "y": -130.42035292911447
    }
  },
  {
    "id": "6",
    "data": {
      "file": "1751281274645-users table.xls",
      "label": "Google Sheets",
      "caption": "\"? Today's Homework for :\""
    },
    "type": "GoogleSheetsNode",
    "width": 252,
    "height": 127,
    "dragging": false,
    "position": {
      "x": 545.2167720798786,
      "y": -226.7838150024327
    },
    "selected": false,
    "positionAbsolute": {
      "x": 545.2167720798786,
      "y": -226.7838150024327
    }
  },
  {
    "id": "8",
    "data": {
      "label": "\"Please upload your completed homework file for review.\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 912.151600624024,
      "y": -9.11347524098369
    },
    "selected": false,
    "positionAbsolute": {
      "x": 912.151600624024,
      "y": -9.11347524098369
    }
  },
  {
    "id": "9",
    "data": {
      "label": "\"? Your homework has been submitted successfully. You'll receive feedback soon.\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1078.0499581213237,
      "y": 33.85300583745355
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1078.0499581213237,
      "y": 33.85300583745355
    }
  },
  {
    "id": "10",
    "data": {
      "label": "\"Please select the subject for which you want to ask a question.\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1171.1440004579374,
      "y": 115.2506172138264
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1171.1440004579374,
      "y": 115.2506172138264
    }
  },
  {
    "id": "11",
    "data": {
      "label": "\"??? Your query has been sent to the teacher. You?ll get a reply within 24 hours.\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1282.1407432439005,
      "y": -29.164499744254407
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1282.1407432439005,
      "y": -29.164499744254407
    }
  },
  {
    "id": "12",
    "data": {
      "label": "\"? Updating homework list...\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1439.68450719817,
      "y": 7.834414517733279
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1439.68450719817,
      "y": 7.834414517733279
    }
  },
  {
    "id": "13",
    "data": {
      "label": "\"Returning to the main menu.\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1374.0412722172243,
      "y": 129.57277757330542
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1374.0412722172243,
      "y": 129.57277757330542
    }
  },
  {
    "id": "14",
    "data": {
      "label": "\"?? I can help you with your class timetable. Would you like to continue by entering your Student ID or selecting your Class?\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 326.13653924867174,
      "y": 171.3457452884528
    },
    "selected": false,
    "positionAbsolute": {
      "x": 326.13653924867174,
      "y": 171.3457452884528
    }
  },
  {
    "id": "15",
    "data": {
      "label": "\"? Here's your class timetable for today (Monday, July 1):\"",
      "targetValues": [
        "9:00 AM ? 9:45 AM: English",
        "9:45 AM ? 10:30 AM: Math",
        "10:30 AM ? 10:45 AM: Break",
        "10:45 AM ? 11:30 AM: Science",
        "11:30 AM ? 12:15 PM: Computer",
        "12:15 PM ? 1:00 PM: Sports"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 314,
    "dragging": false,
    "position": {
      "x": 506.3570571054503,
      "y": -29.164499744254364
    },
    "selected": false,
    "positionAbsolute": {
      "x": 506.3570571054503,
      "y": -29.164499744254364
    }
  },
  {
    "id": "16",
    "data": {
      "label": "\"? I can help you check your latest exam results. Please enter your details for verification.\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "hidden": false,
    "dragging": false,
    "position": {
      "x": 380.75002492027386,
      "y": 274.5641084335753
    },
    "selected": false,
    "positionAbsolute": {
      "x": 380.75002492027386,
      "y": 274.5641084335753
    }
  },
  {
    "id": "17",
    "data": {
      "label": "Image",
      "caption": "",
      "fileUrl": "http://localhost:2500/uploads/1751282740240-1751282739217-Screenshot_2025-06-30_171016.png",
      "fileName": "1751282740240-1751282739217-Screenshot_2025-06-30_171016.png"
    },
    "type": "imageNode",
    "width": 202,
    "height": 117,
    "hidden": false,
    "dragging": false,
    "position": {
      "x": 532.9402368358408,
      "y": 228.7462956817193
    },
    "selected": false,
    "positionAbsolute": {
      "x": 532.9402368358408,
      "y": 228.7462956817193
    }
  },
  {
    "id": "18",
    "data": {
      "file": "1751282826586-demolist.xlsx",
      "label": "Google Sheets",
      "caption": "\"? Preparing your marksheet PDF...\""
    },
    "type": "GoogleSheetsNode",
    "width": 252,
    "height": 127,
    "hidden": false,
    "dragging": false,
    "position": {
      "x": 742.364422033044,
      "y": 120.09256778683236
    },
    "selected": false,
    "positionAbsolute": {
      "x": 742.364422033044,
      "y": 120.09256778683236
    }
  },
  {
    "id": "19",
    "data": {
      "label": "\"Please select the subject you want feedback on:\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "hidden": false,
    "dragging": false,
    "position": {
      "x": 1048.2121240390752,
      "y": 287.59394687289125
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1048.2121240390752,
      "y": 287.59394687289125
    }
  },
  {
    "id": "20",
    "data": {
      "label": "\"? Your feedback request has been sent. You?ll receive a response soon.\""
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "hidden": false,
    "dragging": false,
    "position": {
      "x": 1214.329026515542,
      "y": 308.4779102513038
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1214.329026515542,
      "y": 308.4779102513038
    }
  },
  {
    "id": "23",
    "data": {
      "label": "? Welcome to the Study Material Assistant! I can help you find notes, PDFs, videos, and worksheets for your class."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 360.0591998038303,
      "y": 394.9395786465192
    },
    "selected": false,
    "positionAbsolute": {
      "x": 360.0591998038303,
      "y": 394.9395786465192
    }
  },
  {
    "id": "24",
    "data": {
      "label": "? Great! Now choose the subject you want study material for:",
      "targetValues": [
        "Computer",
        "Geography",
        "History",
        "Science",
        "Math",
        "English"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 314,
    "dragging": false,
    "position": {
      "x": 734.5695122539947,
      "y": 286.6004649272501
    },
    "selected": false,
    "positionAbsolute": {
      "x": 734.5695122539947,
      "y": 286.6004649272501
    }
  },
  {
    "id": "25",
    "data": {
      "label": "? What type of study material are you looking for?",
      "targetValues": [
        "? Notes / PDFs",
        "?? Video Tutorials",
        "? Assignments / Worksheets",
        "?? Presentations"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 242,
    "dragging": false,
    "position": {
      "x": 993.925412219111,
      "y": 369.61993973123583
    },
    "selected": false,
    "positionAbsolute": {
      "x": 993.925412219111,
      "y": 369.61993973123583
    }
  },
  {
    "id": "26",
    "data": {
      "file": "1751283764832-js note.txt",
      "label": "Google Sheets",
      "caption": "? Here are the available materials for Grade 6 ? Science ? Notes:"
    },
    "type": "GoogleSheetsNode",
    "width": 252,
    "height": 127,
    "dragging": false,
    "position": {
      "x": 1396.493348219111,
      "y": 407.6129317312359
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1396.493348219111,
      "y": 407.6129317312359
    }
  },
  {
    "id": "27",
    "data": {
      "label": "DownloadConfirmation:  Your download will begin shortly. You may also check your email for a copy "
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1562.365373819111,
      "y": 535.1619877312359
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1562.365373819111,
      "y": 535.1619877312359
    }
  },
  {
    "id": "28",
    "data": {
      "label": "HelpOrFallback: \nacademics@abcschool.com or call ?? +91-XXXX-XXXX."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1488.497924219111,
      "y": 670.3606437312358
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1488.497924219111,
      "y": 670.3606437312358
    }
  },
  {
    "id": "29",
    "data": {
      "label": "? Hello! I?m the Leave Application Bot. I?ll help you apply for leave. Let?s get started.\n\n"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 492.4783583919615,
      "y": 444.54867255571
    },
    "selected": false,
    "positionAbsolute": {
      "x": 492.4783583919615,
      "y": 444.54867255571
    }
  },
  {
    "id": "30",
    "data": {
      "label": "Are you a:",
      "targetValues": [
        "??? Student",
        "??? Teacher",
        "??? Staff"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 206,
    "dragging": false,
    "position": {
      "x": 644.4834500036321,
      "y": 390.59571537796705
    },
    "selected": false,
    "positionAbsolute": {
      "x": 644.4834500036321,
      "y": 390.59571537796705
    }
  },
  {
    "id": "31",
    "data": {
      "label": "What is your name?"
    },
    "type": "CustomNode",
    "width": 131,
    "height": 65,
    "dragging": false,
    "position": {
      "x": 828.3290076445925,
      "y": 647.9776512719817
    },
    "selected": false,
    "positionAbsolute": {
      "x": 828.3290076445925,
      "y": 647.9776512719817
    }
  },
  {
    "id": "32",
    "data": {
      "label": "Ask a Question?"
    },
    "type": "CustomNode",
    "width": 131,
    "height": 65,
    "dragging": false,
    "position": {
      "x": 992.7136289991612,
      "y": 643.3471664211319
    },
    "selected": false,
    "positionAbsolute": {
      "x": 992.7136289991612,
      "y": 643.3471664211319
    }
  },
  {
    "id": "33",
    "data": {
      "label": " ? What type of leave are you applying for?",
      "targetValues": [
        "Sick Leave ?",
        "Personal Leave ?",
        "Emergency Leave ?",
        "Vacation/Planned Leave ??"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 242,
    "dragging": false,
    "position": {
      "x": 1170.984335655306,
      "y": 593.04595372926
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1170.984335655306,
      "y": 593.04595372926
    }
  },
  {
    "id": "34",
    "data": {
      "label": "? What is your leave start date? (e.g., 2025-07-01)\n? What is your leave end date?"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1365.186737982781,
      "y": 788.7645872211319
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1365.186737982781,
      "y": 788.7645872211319
    }
  },
  {
    "id": "35",
    "data": {
      "label": "?? Please briefly explain the reason for your leave."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1511.2237586054143,
      "y": 773.2183409249138
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1511.2237586054143,
      "y": 773.2183409249138
    }
  },
  {
    "id": "36",
    "data": {
      "label": "Ask a Question?"
    },
    "type": "CustomNode",
    "width": 131,
    "height": 65,
    "dragging": false,
    "position": {
      "x": 1550.9750457197476,
      "y": 804.7958909850145
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1550.9750457197476,
      "y": 804.7958909850145
    }
  },
  {
    "id": "37",
    "data": {
      "label": "Your leave request has been submitted successfully."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1680.3419724378757,
      "y": 770.2864692883734
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1680.3419724378757,
      "y": 770.2864692883734
    }
  },
  {
    "id": "38",
    "data": {
      "label": "Would you like to know about:",
      "targetValues": [
        "Upcoming Holidays",
        " School Events",
        "Past Events Summary"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 206,
    "dragging": false,
    "position": {
      "x": 385.92830832693727,
      "y": 538.3537103729604
    },
    "selected": false,
    "positionAbsolute": {
      "x": 385.92830832693727,
      "y": 538.3537103729604
    }
  },
  {
    "id": "39",
    "data": {
      "label": " Here?s the list of upcoming holidays:",
      "targetValues": [
        "? Independence Day ? 15th Aug",
        "Dashain Break ? 10th Oct to 17th Oct",
        "Eid al-Fitr ? 6th Apr"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 206,
    "dragging": false,
    "position": {
      "x": 608.3841163269373,
      "y": 642.8631503729606
    },
    "selected": false,
    "positionAbsolute": {
      "x": 608.3841163269373,
      "y": 642.8631503729606
    }
  },
  {
    "id": "40",
    "data": {
      "label": "? Yes! 25th December is a holiday for Christmas. Enjoy your break!"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 996.2332455929308,
      "y": 778.0031329830613
    },
    "selected": false,
    "positionAbsolute": {
      "x": 996.2332455929308,
      "y": 778.0031329830613
    }
  },
  {
    "id": "41",
    "data": {
      "label": "? Please enter the date you'd like to check"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 823.3749643269371,
      "y": 777.2324303729604
    },
    "selected": false,
    "positionAbsolute": {
      "x": 823.3749643269371,
      "y": 777.2324303729604
    }
  },
  {
    "id": "43",
    "data": {
      "label": "What would you like to do?",
      "targetValues": [
        " Track Bus Location",
        " View Pickup/Drop Time",
        "See Route Info",
        "Driver Contact Details"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 242,
    "dragging": false,
    "position": {
      "x": 236.1571031794984,
      "y": 678.5403346524955
    },
    "selected": false,
    "positionAbsolute": {
      "x": 236.1571031794984,
      "y": 678.5403346524955
    }
  },
  {
    "id": "44",
    "data": {
      "label": "Please enter your Bus Number or select from the list below:"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 485.972712477815,
      "y": 799.2657060238087
    },
    "selected": false,
    "positionAbsolute": {
      "x": 485.972712477815,
      "y": 799.2657060238087
    }
  },
  {
    "id": "45",
    "data": {
      "label": "Ask a Question?"
    },
    "type": "CustomNode",
    "width": 131,
    "height": 65,
    "dragging": false,
    "position": {
      "x": 585.4468012481855,
      "y": 902.1309569113508
    },
    "selected": false,
    "positionAbsolute": {
      "x": 585.4468012481855,
      "y": 902.1309569113508
    }
  },
  {
    "id": "46",
    "data": {
      "label": "Ask a Question?"
    },
    "type": "CustomNode",
    "width": 131,
    "height": 65,
    "dragging": false,
    "position": {
      "x": 724.4844480522258,
      "y": 881.7839842083206
    },
    "selected": false,
    "positionAbsolute": {
      "x": 724.4844480522258,
      "y": 881.7839842083206
    }
  },
  {
    "id": "47",
    "data": {
      "label": "Please provide your Bus Number."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 896.303328655593,
      "y": 886.3055336978829
    },
    "selected": false,
    "positionAbsolute": {
      "x": 896.303328655593,
      "y": 886.3055336978829
    }
  },
  {
    "id": "49",
    "data": {
      "label": "Please describe the issue you?re facing:"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 1054.557560790273,
      "y": 887.6619985447514
    },
    "selected": false,
    "positionAbsolute": {
      "x": 1054.557560790273,
      "y": 887.6619985447514
    }
  },
  {
    "id": "51",
    "data": {
      "label": "How can I assist you today?",
      "targetValues": [
        "? Book a session with a counselor",
        "? I?m feeling stressed or anxious",
        "? I have a personal problem",
        "? Report bullying or harassment",
        "? I need academic support",
        " Mental health resources"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 314,
    "dragging": false,
    "position": {
      "x": -9.136956629255849,
      "y": 744.1028022511485
    },
    "selected": false,
    "positionAbsolute": {
      "x": -9.136956629255849,
      "y": 744.1028022511485
    }
  },
  {
    "id": "52",
    "data": {
      "label": "Ask a Question?"
    },
    "type": "CustomNode",
    "width": 131,
    "height": 65,
    "dragging": false,
    "position": {
      "x": 222.5924547108116,
      "y": 954.3548535157952
    },
    "selected": false,
    "positionAbsolute": {
      "x": 222.5924547108116,
      "y": 954.3548535157952
    }
  },
  {
    "id": "53",
    "data": {
      "label": " I?m sorry to hear that. Can you describe how you're feeling right now?"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 385.36823633505406,
      "y": 946.4421419090612
    },
    "selected": false,
    "positionAbsolute": {
      "x": 385.36823633505406,
      "y": 946.4421419090612
    }
  },
  {
    "id": "54",
    "data": {
      "label": "? I understand. You can tell me as much or as little as you like."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 498.40697357411136,
      "y": 1021.0477084868388
    },
    "selected": false,
    "positionAbsolute": {
      "x": 498.40697357411136,
      "y": 1021.0477084868388
    }
  },
  {
    "id": "55",
    "data": {
      "label": " Thank you for coming forward. Everything you share here is safe and confidential.\nWho is being bullied?"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 651.0092688468387,
      "y": 1015.3957716248864
    },
    "selected": false,
    "positionAbsolute": {
      "x": 651.0092688468387,
      "y": 1015.3957716248864
    }
  },
  {
    "id": "57",
    "data": {
      "label": "? What subject or topic are you struggling with?"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 804.7419514919567,
      "y": 1034.612356955526
    },
    "selected": false,
    "positionAbsolute": {
      "x": 804.7419514919567,
      "y": 1034.612356955526
    }
  },
  {
    "id": "59",
    "data": {
      "label": " Here are some helpful resources:"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 972.0392826057612,
      "y": 1008.6134473905428
    },
    "selected": false,
    "positionAbsolute": {
      "x": 972.0392826057612,
      "y": 1008.6134473905428
    }
  },
  {
    "id": "60",
    "data": {
      "label": "Link",
      "linkUrl": "https://www.youtube.com/watch?v=ZToicYcHIOU",
      "linkText": "? Guided Meditation: "
    },
    "type": "LinkNode",
    "width": 202,
    "height": 122,
    "dragging": false,
    "position": {
      "x": 987.8647058192296,
      "y": 1097.9140498093982
    },
    "selected": false,
    "positionAbsolute": {
      "x": 987.8647058192296,
      "y": 1097.9140498093982
    }
  },
  {
    "id": "61",
    "data": {
      "label": "How can I help you today?",
      "targetValues": [
        "Check Book Availability",
        "Renew Borrowed Book",
        "View My Issued Books",
        "Late Fee / Fine Info",
        "Library Rules"
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 278,
    "dragging": false,
    "position": {
      "x": -283.45833737981604,
      "y": 909.3939356831696
    },
    "selected": false,
    "positionAbsolute": {
      "x": -283.45833737981604,
      "y": 909.3939356831696
    }
  },
  {
    "id": "64",
    "data": {
      "label": "Great! Please enter the book name, author, or ISBN to search."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": -28.616152049948987,
      "y": 1071.3699009352038
    },
    "selected": false,
    "positionAbsolute": {
      "x": -28.616152049948987,
      "y": 1071.3699009352038
    }
  },
  {
    "id": "65",
    "data": {
      "label": "Please enter the Book ID or Title you'd like to renew."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 144.1582108855541,
      "y": 1090.8070167654478
    },
    "selected": false,
    "positionAbsolute": {
      "x": 144.1582108855541,
      "y": 1090.8070167654478
    }
  },
  {
    "id": "66",
    "data": {
      "label": "Please enter your Student ID:"
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 252.1421877202435,
      "y": 1182.5933970749336
    },
    "selected": false,
    "positionAbsolute": {
      "x": 252.1421877202435,
      "y": 1182.5933970749336
    }
  },
  {
    "id": "67",
    "data": {
      "label": "Enter your Student ID to check fines."
    },
    "type": "CustomText",
    "width": 127,
    "height": 68,
    "dragging": false,
    "position": {
      "x": 57.771029417802566,
      "y": 1168.5554800864245
    },
    "selected": false,
    "positionAbsolute": {
      "x": 57.771029417802566,
      "y": 1168.5554800864245
    }
  },
  {
    "id": "68",
    "data": {
      "label": " Library Rules Summary:",
      "targetValues": [
        "Max 3 books can be issued at a time.",
        "Each book can be renewed once for 14 days.",
        "Late fine is ?10 per day.",
        "Lost books must be reported immediately.",
        "Silence must be maintained in the library."
      ]
    },
    "type": "ListButton",
    "width": 172,
    "height": 278,
    "dragging": false,
    "position": {
      "x": 25.375836367395703,
      "y": 1253.862821785829
    },
    "selected": false,
    "positionAbsolute": {
      "x": 25.375836367395703,
      "y": 1253.862821785829
    }
  }
]',
  '[
  {
    "id": "reactflow__edge-1-3",
    "type": "smoothstep",
    "source": "1",
    "target": "3",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_0-4",
    "type": "smoothstep",
    "source": "3",
    "target": "4",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-4-5",
    "type": "smoothstep",
    "source": "4",
    "target": "5",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_0-5",
    "type": "smoothstep",
    "source": "3",
    "target": "5",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-5option_0-6",
    "type": "smoothstep",
    "source": "5",
    "target": "6",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-5option_1-6",
    "type": "smoothstep",
    "source": "5",
    "target": "6",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-5option_2-6",
    "type": "smoothstep",
    "source": "5",
    "target": "6",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-5option_3-6",
    "type": "smoothstep",
    "source": "5",
    "target": "6",
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-5option_4-6",
    "type": "smoothstep",
    "source": "5",
    "target": "6",
    "sourceHandle": "option_4",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-6-7",
    "type": "smoothstep",
    "source": "6",
    "target": "7",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-6-8",
    "type": "smoothstep",
    "source": "6",
    "target": "8",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-8-9",
    "type": "smoothstep",
    "source": "8",
    "target": "9",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-10-11",
    "type": "smoothstep",
    "source": "10",
    "target": "11",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-9-10",
    "type": "smoothstep",
    "source": "9",
    "target": "10",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-11-12",
    "type": "smoothstep",
    "source": "11",
    "target": "12",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-12-13",
    "type": "smoothstep",
    "source": "12",
    "target": "13",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_1-14",
    "type": "smoothstep",
    "source": "3",
    "target": "14",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-14-15",
    "type": "smoothstep",
    "source": "14",
    "target": "15",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_2-16",
    "type": "smoothstep",
    "hidden": false,
    "source": "3",
    "target": "16",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-16-17",
    "type": "smoothstep",
    "hidden": false,
    "source": "16",
    "target": "17",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-17-18",
    "type": "smoothstep",
    "hidden": false,
    "source": "17",
    "target": "18",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-18-19",
    "type": "smoothstep",
    "hidden": false,
    "source": "18",
    "target": "19",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-19-20",
    "type": "smoothstep",
    "hidden": false,
    "source": "19",
    "target": "20",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-20-22",
    "type": "smoothstep",
    "hidden": false,
    "source": "20",
    "target": "22",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_3-23",
    "type": "smoothstep",
    "source": "3",
    "target": "23",
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-23-24",
    "type": "smoothstep",
    "source": "23",
    "target": "24",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-24option_0-25",
    "type": "smoothstep",
    "source": "24",
    "target": "25",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-24option_1-25",
    "type": "smoothstep",
    "source": "24",
    "target": "25",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-24option_2-25",
    "type": "smoothstep",
    "source": "24",
    "target": "25",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-24option_3-25",
    "type": "smoothstep",
    "source": "24",
    "target": "25",
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-24option_4-25",
    "type": "smoothstep",
    "source": "24",
    "target": "25",
    "sourceHandle": "option_4",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-24option_5-25",
    "type": "smoothstep",
    "source": "24",
    "target": "25",
    "sourceHandle": "option_5",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-25option_0-26",
    "type": "smoothstep",
    "source": "25",
    "target": "26",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-25option_2-26",
    "type": "smoothstep",
    "source": "25",
    "target": "26",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-25option_3-26",
    "type": "smoothstep",
    "source": "25",
    "target": "26",
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-26-27",
    "type": "smoothstep",
    "source": "26",
    "target": "27",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-27-28",
    "type": "smoothstep",
    "source": "27",
    "target": "28",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_4-29",
    "type": "smoothstep",
    "source": "3",
    "target": "29",
    "sourceHandle": "option_4",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-29-30",
    "type": "smoothstep",
    "source": "29",
    "target": "30",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-30option_0-31",
    "type": "smoothstep",
    "source": "30",
    "target": "31",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-30option_1-31",
    "type": "smoothstep",
    "source": "30",
    "target": "31",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-30option_2-31",
    "type": "smoothstep",
    "source": "30",
    "target": "31",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-31-32",
    "type": "smoothstep",
    "source": "31",
    "target": "32",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-32-33",
    "type": "smoothstep",
    "source": "32",
    "target": "33",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-33option_0-34",
    "type": "smoothstep",
    "source": "33",
    "target": "34",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-33option_1-34",
    "type": "smoothstep",
    "source": "33",
    "target": "34",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-33option_2-34",
    "type": "smoothstep",
    "source": "33",
    "target": "34",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-33option_3-34",
    "type": "smoothstep",
    "source": "33",
    "target": "34",
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-34-35",
    "type": "smoothstep",
    "source": "34",
    "target": "35",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-35-36",
    "type": "smoothstep",
    "source": "35",
    "target": "36",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-36-37",
    "type": "smoothstep",
    "source": "36",
    "target": "37",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_5-38",
    "type": "smoothstep",
    "source": "3",
    "target": "38",
    "sourceHandle": "option_5",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-38option_0-39",
    "type": "smoothstep",
    "source": "38",
    "target": "39",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-39option_0-41",
    "type": "smoothstep",
    "source": "39",
    "target": "41",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-39option_1-41",
    "type": "smoothstep",
    "source": "39",
    "target": "41",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-39option_2-41",
    "type": "smoothstep",
    "source": "39",
    "target": "41",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-41-40",
    "type": "smoothstep",
    "source": "41",
    "target": "40",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_6-43",
    "type": "smoothstep",
    "source": "3",
    "target": "43",
    "sourceHandle": "option_6",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-43option_0-44",
    "type": "smoothstep",
    "source": "43",
    "target": "44",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-44-45",
    "type": "smoothstep",
    "source": "44",
    "target": "45",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-45-46",
    "type": "smoothstep",
    "source": "45",
    "target": "46",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-46-47",
    "type": "smoothstep",
    "source": "46",
    "target": "47",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-43option_1-44",
    "type": "smoothstep",
    "source": "43",
    "target": "44",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-43option_2-44",
    "type": "smoothstep",
    "source": "43",
    "target": "44",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-43option_3-44",
    "type": "smoothstep",
    "source": "43",
    "target": "44",
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-47-49",
    "type": "smoothstep",
    "source": "47",
    "target": "49",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_7-51",
    "type": "smoothstep",
    "source": "3",
    "target": "51",
    "sourceHandle": "option_7",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-51option_0-52",
    "type": "smoothstep",
    "source": "51",
    "target": "52",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-51option_1-52",
    "type": "smoothstep",
    "source": "51",
    "target": "52",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-51option_2-52",
    "type": "smoothstep",
    "source": "51",
    "target": "52",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-51option_3-52",
    "type": "smoothstep",
    "source": "51",
    "target": "52",
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-51option_4-52",
    "type": "smoothstep",
    "source": "51",
    "target": "52",
    "sourceHandle": "option_4",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-51option_5-52",
    "type": "smoothstep",
    "source": "51",
    "target": "52",
    "sourceHandle": "option_5",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-52-53",
    "type": "smoothstep",
    "source": "52",
    "target": "53",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-53-54",
    "type": "smoothstep",
    "source": "53",
    "target": "54",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-54-55",
    "type": "smoothstep",
    "source": "54",
    "target": "55",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-55-57",
    "type": "smoothstep",
    "source": "55",
    "target": "57",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-57-59",
    "type": "smoothstep",
    "source": "57",
    "target": "59",
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-3option_8-61",
    "type": "smoothstep",
    "source": "3",
    "target": "61",
    "sourceHandle": "option_8",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_0-62",
    "type": "smoothstep",
    "source": "61",
    "target": "62",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_1-62",
    "type": "smoothstep",
    "source": "61",
    "target": "62",
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_2-62",
    "type": "smoothstep",
    "source": "61",
    "target": "62",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_3-62",
    "type": "smoothstep",
    "source": "61",
    "target": "62",
    "selected": false,
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_4-62",
    "type": "smoothstep",
    "source": "61",
    "target": "62",
    "selected": false,
    "sourceHandle": "option_4",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_0-64",
    "type": "smoothstep",
    "source": "61",
    "target": "64",
    "sourceHandle": "option_0",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_1-65",
    "type": "smoothstep",
    "source": "61",
    "target": "65",
    "selected": false,
    "sourceHandle": "option_1",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-65-66",
    "type": "smoothstep",
    "source": "65",
    "target": "66",
    "selected": false,
    "sourceHandle": null,
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_2-66",
    "type": "smoothstep",
    "source": "61",
    "target": "66",
    "sourceHandle": "option_2",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_3-67",
    "type": "smoothstep",
    "source": "61",
    "target": "67",
    "sourceHandle": "option_3",
    "targetHandle": null
  },
  {
    "id": "reactflow__edge-61option_4-68",
    "type": "smoothstep",
    "source": "61",
    "target": "68",
    "sourceHandle": "option_4",
    "targetHandle": null
  }
]',
  '2025-06-30 16:12:20',
  0,
  NULL
);
