document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle
    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Dashboard Tab Switching
    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            tabPanes.forEach(function(p) { p.classList.remove('active'); });
            btn.classList.add('active');
            var targetId = btn.getAttribute('data-tab');
            var targetPane = document.getElementById(targetId);
            if (targetPane) { targetPane.classList.add('active'); }
        });
    });

    // 3. Modal Functionality for Gallery
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('modalImg');
    var captionText = document.getElementById('modalCaption');
    var closeBtn = document.getElementsByClassName('close-modal')[0];

    window.openModal = function(imgSrc, altText) {
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        captionText.innerHTML = altText;
        document.body.style.overflow = 'hidden';
    };

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // 4. Survey Data & Analytics
    if (document.getElementById('categoryChart')) {
        initCharts();
        initTable();
    }

    // 5. Interactive Corridor Operations Hub (6 Features)
    if (document.getElementById('interactive-transit-hub')) {
        initInteractiveTransitHub();
    }
});

// =====================================================================
// Survey Response Dataset (60 Entries)
// =====================================================================
var surveyResponses = [
  { id: 1, date: "14/09/2026", stopLocation: "Malad Station (W) Bus Stop", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Show live crowding status inside the Chalo app before bus arrives." },
  { id: 2, date: "14/09/2026", stopLocation: "Nirav Talkies / SV Road Malad", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Increase frequency of 202 and 203 during 7:30 to 9:30 AM college hours." },
  { id: 3, date: "14/09/2026", stopLocation: "Goregaon Bus Depot", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "Digital pass scanning should be faster, conductors waste time in heavy rush." },
  { id: 4, date: "14/09/2026", stopLocation: "Jogeshwari Caves Road Junction", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Street Lighting (Night Visibility)"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Live bus tracking GPS is missing on many AC red buses." },
  { id: 5, date: "15/09/2026", stopLocation: "Ismail Yusuf College Stop (Jogeshwari E)", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Provide student special shuttles directly from Malad Stn to IY College." },
  { id: 6, date: "15/09/2026", stopLocation: "Lalji Pada / Link Road Malad", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Digital queue management system at major stops like Malad." },
  { id: 7, date: "15/09/2026", stopLocation: "Goregaon Station (W) Junction", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "App should alert if the next 2 incoming buses are already full." },
  { id: 8, date: "15/09/2026", stopLocation: "Jogeshwari Bus Station (W)", category: "Senior Citizen", frequency: "2–3 times a week", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "Low floor electric buses should be deployed, high steps are dangerous." },
  { id: 9, date: "16/09/2026", stopLocation: "Hub Mall / WEH Goregaon", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Covered Shelter", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Fix traffic bottleneck near Hub Mall flyover to improve bus timing." },
  { id: 10, date: "16/09/2026", stopLocation: "Malad SV Road / NL High School", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Student Pass / Ticketing issues", digitalSuggestion: "Student bus pass digital renewal process in Chalo app fails frequently." },
  { id: 11, date: "16/09/2026", stopLocation: "Hypercity / Oshiwara Link Road", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Need double decker EV buses on Link road corridor during 6-8 PM." },
  { id: 12, date: "16/09/2026", stopLocation: "Mith Chowki Malad (W)", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Street Lighting (Night Visibility)"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Digital display boards needed at Mith Chowki shelter urgently." },
  { id: 13, date: "17/09/2026", stopLocation: "Jogeshwari Station East", category: "School / College Student", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "QR code payment should be supported directly inside bus." },
  { id: 14, date: "17/09/2026", stopLocation: "Bangur Nagar Malad", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Bus location in Chalo app sometimes freezes for 5-10 minutes." },
  { id: 15, date: "17/09/2026", stopLocation: "Ram Mandir Road / Goregaon E", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "Less than 10 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Mini electric buses should run frequently to connect to Ram Mandir stn." },
  { id: 16, date: "17/09/2026", stopLocation: "Oshiwara Bus Depot / Andheri Link", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Curb Ramp / Senior & PwD Accessible Step"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "Automated announcement inside bus for upcoming stops is not working." },
  { id: 17, date: "18/09/2026", stopLocation: "Ismail Yusuf College Stop", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Bus frequency on route 202 is too low after 8:30 AM." },
  { id: 18, date: "18/09/2026", stopLocation: "Malad West Station", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Overcrowding", digitalSuggestion: "Strict queue system needed near Malad stn bus stop." },
  { id: 19, date: "18/09/2026", stopLocation: "Goregaon SV Road Junction", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Live ETA clock display at bus stop shelters." },
  { id: 20, date: "18/09/2026", stopLocation: "Jogeshwari Majas Depot", category: "Other", frequency: "2–3 times a week", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)", "Curb Ramp / Senior & PwD Accessible Step"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "Ramp access required for wheelchair accessibility." },
  { id: 21, date: "19/09/2026", stopLocation: "Chincholi Bunder Malad", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "App shows bus arriving in 2 mins but bus takes 15 mins due to traffic." },
  { id: 22, date: "19/09/2026", stopLocation: "Inorbit Mall Malad Link Rd", category: "School / College Student", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Special student discount pass integration in UPI apps directly." },
  { id: 23, date: "19/09/2026", stopLocation: "Goregaon MTNL SV Road", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Add dedicated bus lane on SV road during morning rush hours." },
  { id: 24, date: "19/09/2026", stopLocation: "Jogeshwari WEH Metro Link", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Seamless card integration between Mumbai Metro line 7 and BEST bus." },
  { id: 25, date: "20/09/2026", stopLocation: "Malad Orlem Church", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "More feeder routes connecting interior Malad West to SV road." },
  { id: 26, date: "20/09/2026", stopLocation: "Oshiwara Bridge Link Rd", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Real-time updates if bus route is diverted due to waterlogging/construction." },
  { id: 27, date: "20/09/2026", stopLocation: "Ismail Yusuf College Stop", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Morning 8:00 AM buses are completely jammed, footboard travel is unsafe." },
  { id: 28, date: "21/09/2026", stopLocation: "Goregaon East Station", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Increase frequency of route 459 and 202 during peak hours." },
  { id: 29, date: "21/09/2026", stopLocation: "Jogeshwari Railway Station (E)", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "Better shelter lighting and bench installation required." },
  { id: 30, date: "21/09/2026", stopLocation: "Malad Liberty Garden", category: "Senior Citizen", frequency: "2–3 times a week", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Curb Ramp / Senior & PwD Accessible Step"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "Conductors should ensure senior citizens board safely before signaling driver." },
  { id: 31, date: "22/09/2026", stopLocation: "Infinity Mall Malad", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Direct bus routes from Infinity Mall to Andheri MIDC area." },
  { id: 32, date: "22/09/2026", stopLocation: "Goregaon Bangur Nagar Metro", category: "School / College Student", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Student Pass / Ticketing issues", digitalSuggestion: "Digital student concessions must apply across both Metro and BEST." },
  { id: 33, date: "22/09/2026", stopLocation: "Jogeshwari WEH Junction", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Traffic signal priority for public transit buses at major intersections." },
  { id: 34, date: "22/09/2026", stopLocation: "Malad Pushpa Park SV Road", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Street Lighting (Night Visibility)"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Overcrowding", digitalSuggestion: "Install basic bus shelter roof to protect from heat and rain." },
  { id: 35, date: "23/09/2026", stopLocation: "Ismail Yusuf College Stop", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Depot should dispatch extra starting buses from Jogeshwari depot during 8 AM." },
  { id: 36, date: "23/09/2026", stopLocation: "Goregaon Anupam Cinema", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Improve tap-in/tap-out Chalo card machine speed." },
  { id: 37, date: "23/09/2026", stopLocation: "Malad Dmart Link Road", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Provide dynamic live ETA screens at high traffic stops like Dmart." },
  { id: 38, date: "23/09/2026", stopLocation: "Oshiwara Police Station", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Need more frequent buses towards Andheri station." },
  { id: 39, date: "24/09/2026", stopLocation: "Jogeshwari SV Road / Suburban", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Chalo app should show live GPS position of bus without lagging." },
  { id: 40, date: "24/09/2026", stopLocation: "Malad Dindoshi Depot", category: "Other", frequency: "Occasionally", waitTime: "Less than 10 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)", "Curb Ramp / Senior & PwD Accessible Step"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "Information desk at bus depot should help commuters with route maps." },
  { id: 41, date: "24/09/2026", stopLocation: "Goregaon Unnat Nagar", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Student Pass / Ticketing issues", digitalSuggestion: "Student pass verification should not require physical college stamp every month." },
  { id: 42, date: "24/09/2026", stopLocation: "Malad West Station", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Overcrowding", digitalSuggestion: "Automated queue barricades near station stop to prevent crowd rushing." },
  { id: 43, date: "25/09/2026", stopLocation: "Ismail Yusuf College Stop", category: "School / College Student", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "College timing aligned extra bus trips during morning peak." },
  { id: 44, date: "25/09/2026", stopLocation: "Oshiwara Mega Mall", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "App should send notification if bus on favorite route is delayed by >15 mins." },
  { id: 45, date: "25/09/2026", stopLocation: "Jogeshwari Shankara Temple", category: "Senior Citizen", frequency: "2–3 times a week", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "Proper pavement ramps at bus stops so elderly people don't fall." },
  { id: 46, date: "25/09/2026", stopLocation: "Goregaon Vivek College Stop", category: "School / College Student", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Digital transit map board at college entry showing live bus arrival times." },
  { id: 47, date: "26/09/2026", stopLocation: "Malad Mith Chowki Junction", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Street Lighting (Night Visibility)"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Heavy traffic at Mith Chowki signal causes 20 min delay for every bus." },
  { id: 48, date: "26/09/2026", stopLocation: "Goregaon Hub Mall WEH", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Sync Chalo app live tracking data with Google Maps for accurate transit routes." },
  { id: 49, date: "26/09/2026", stopLocation: "Jogeshwari Bus Station (E)", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Deploy more double decker buses on high demand routes like 202 and 203." },
  { id: 50, date: "26/09/2026", stopLocation: "Malad Evershine Nagar", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Bus location should update every 5 seconds on map." },
  { id: 51, date: "27/09/2026", stopLocation: "Ismail Yusuf College Stop", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Buses are so full that drivers do not even stop at IY College stop." },
  { id: 52, date: "27/09/2026", stopLocation: "Oshiwara Relief Road", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Cashless ticketing should be compulsory to speed up boarding." },
  { id: 53, date: "27/09/2026", stopLocation: "Goregaon Motilal Nagar", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Improve bus maintenance, frequent breakdowns cause unexpected delays." },
  { id: 54, date: "27/09/2026", stopLocation: "Jogeshwari WEH Metro Link", category: "School / College Student", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Student Pass / Ticketing issues", digitalSuggestion: "Student monthly pass renewal should be 100% online without physical forms." },
  { id: 55, date: "28/09/2026", stopLocation: "Malad Station West", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "More than 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Overcrowding", digitalSuggestion: "Deploy extra buses starting from Malad station towards Andheri/Jogeshwari." },
  { id: 56, date: "28/09/2026", stopLocation: "Goregaon SV Road", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter", "Seating / Benches"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Digital route maps showing real time traffic delays at bus stops." },
  { id: 57, date: "28/09/2026", stopLocation: "Oshiwara Bus Depot", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Boarding difficulty (High steps / No ramps)", digitalSuggestion: "More electric AC buses needed on this line." },
  { id: 58, date: "28/09/2026", stopLocation: "Ismail Yusuf College Stop", category: "School / College Student", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Covered Shelter"], appAccuracy: "Moderately accurate (Occasional delays / untracked buses)", biggestIssue: "Overcrowding", digitalSuggestion: "Real-time crowd meter in Chalo app so students can plan early." },
  { id: 59, date: "29/09/2026", stopLocation: "Jogeshwari Caves Road Junction", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "20 to 35 minutes", amenities: ["Street Lighting (Night Visibility)"], appAccuracy: "Inaccurate / Do not use the app", biggestIssue: "Irregular bus frequency / Delays", digitalSuggestion: "Install proper bus shelter with digital timing board." },
  { id: 60, date: "29/09/2026", stopLocation: "Malad Mindspace Link Road", category: "Working Professional / Daily Commuter", frequency: "Daily", waitTime: "10 to 20 minutes", amenities: ["Covered Shelter", "Seating / Benches", "Route Display Board (Digital / Static Map)", "Street Lighting (Night Visibility)"], appAccuracy: "Highly accurate (Shows correct arrival times)", biggestIssue: "Overcrowding", digitalSuggestion: "Dedicated IT park express shuttle buses from Malad Stn to Mindspace." }
];

// =====================================================================
// Chart.js Initialization
// =====================================================================
function initCharts() {
    var bgColors = [
        'rgba(198, 40, 40, 0.8)',
        'rgba(49, 130, 206, 0.8)',
        'rgba(237, 137, 54, 0.8)',
        'rgba(113, 128, 150, 0.8)'
    ];
    var textLight = '#fff';
    var gridColor = 'rgba(255,255,255,0.1)';

    Chart.defaults.color = textLight;
    Chart.defaults.font.family = 'Inter, sans-serif';

    // --- Chart 1 (Pie Chart): Commuter Category Distribution ---
    var catCounts = { 'Working Professional': 0, 'Student': 0, 'Senior Citizen': 0, 'Other': 0 };
    surveyResponses.forEach(function(r) {
        if (r.category.indexOf('Working') !== -1) catCounts['Working Professional']++;
        else if (r.category.indexOf('Student') !== -1) catCounts['Student']++;
        else if (r.category.indexOf('Senior') !== -1) catCounts['Senior Citizen']++;
        else catCounts['Other']++;
    });

    new Chart(document.getElementById('categoryChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(catCounts),
            datasets: [{
                data: Object.values(catCounts),
                backgroundColor: bgColors,
                borderColor: 'rgba(255,255,255,0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: textLight, padding: 16 } }
            }
        }
    });

    // --- Chart 2 (Bar Chart): Peak Hour Wait Time Breakdown ---
    var waitBuckets = { '< 10 mins': 0, '10-20 mins': 0, '20-35 mins': 0, '> 35 mins': 0 };
    surveyResponses.forEach(function(r) {
        if (r.waitTime === 'Less than 10 minutes') waitBuckets['< 10 mins']++;
        else if (r.waitTime === '10 to 20 minutes') waitBuckets['10-20 mins']++;
        else if (r.waitTime === '20 to 35 minutes') waitBuckets['20-35 mins']++;
        else waitBuckets['> 35 mins']++;
    });

    new Chart(document.getElementById('waitTimeChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(waitBuckets),
            datasets: [{
                label: 'Commuters',
                data: Object.values(waitBuckets),
                backgroundColor: 'rgba(49, 130, 206, 0.8)',
                borderColor: '#3182ce',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: gridColor }, ticks: { color: textLight } },
                x: { grid: { display: false }, ticks: { color: textLight } }
            }
        }
    });

    // --- Chart 3 (Bar Chart): Primary Commuter Issues ---
    var issueCounts = { 'Overcrowding': 0, 'Delays': 0, 'Boarding Issues': 0, 'Pass Issues': 0 };
    surveyResponses.forEach(function(r) {
        if (r.biggestIssue === 'Overcrowding') issueCounts['Overcrowding']++;
        else if (r.biggestIssue === 'Irregular bus frequency / Delays') issueCounts['Delays']++;
        else if (r.biggestIssue === 'Boarding difficulty (High steps / No ramps)') issueCounts['Boarding Issues']++;
        else if (r.biggestIssue === 'Student Pass / Ticketing issues') issueCounts['Pass Issues']++;
    });

    new Chart(document.getElementById('issuesChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(issueCounts),
            datasets: [{
                label: 'Reported Cases',
                data: Object.values(issueCounts),
                backgroundColor: [
                    'rgba(198, 40, 40, 0.8)',
                    'rgba(237, 137, 54, 0.8)',
                    'rgba(49, 130, 206, 0.8)',
                    'rgba(113, 128, 150, 0.8)'
                ],
                borderColor: ['#c62828', '#ed8936', '#3182ce', '#718096'],
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: gridColor }, ticks: { color: textLight } },
                x: { grid: { display: false }, ticks: { color: textLight } }
            }
        }
    });
}

// =====================================================================
// Searchable & Filterable Paginated Survey Table
// =====================================================================
var currentPage = 1;
var rowsPerPage = 10;
var filteredData = [];

function initTable() {
    var searchInput = document.getElementById('surveySearchInput');
    var categoryFilter = document.getElementById('surveyCategoryFilter');
    var prevBtn = document.getElementById('prevPageBtn');
    var nextBtn = document.getElementById('nextPageBtn');

    filteredData = surveyResponses.slice();
    renderTable();

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) { currentPage--; renderTable(); }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            var totalPages = Math.ceil(filteredData.length / rowsPerPage);
            if (currentPage < totalPages) { currentPage++; renderTable(); }
        });
    }
}

function applyFilters() {
    var query = (document.getElementById('surveySearchInput').value || '').toLowerCase();
    var category = document.getElementById('surveyCategoryFilter').value;

    filteredData = surveyResponses.filter(function(r) {
        var matchesQuery = r.stopLocation.toLowerCase().indexOf(query) > -1 ||
                           r.category.toLowerCase().indexOf(query) > -1 ||
                           r.digitalSuggestion.toLowerCase().indexOf(query) > -1 ||
                           r.biggestIssue.toLowerCase().indexOf(query) > -1;
        var matchesCategory = category === 'All' || r.category === category;
        return matchesQuery && matchesCategory;
    });

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var tbody = document.getElementById('surveyTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    var startIdx = (currentPage - 1) * rowsPerPage;
    var endIdx = startIdx + rowsPerPage;
    var pageData = filteredData.slice(startIdx, endIdx);

    for (var i = 0; i < pageData.length; i++) {
        var r = pageData[i];
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>#' + r.id + '</td>' +
            '<td style="white-space:nowrap">' + r.date + '</td>' +
            '<td><strong>' + r.stopLocation + '</strong></td>' +
            '<td><span class="badge" style="background:rgba(255,255,255,0.2);color:white;">' + r.category + '</span></td>' +
            '<td style="white-space:nowrap">' + r.waitTime + '</td>' +
            '<td>' + r.biggestIssue + '</td>' +
            '<td><em>' + r.digitalSuggestion + '</em></td>';
        tbody.appendChild(tr);
    }

    var totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
    var indicator = document.getElementById('pageIndicator');
    var prevBtn = document.getElementById('prevPageBtn');
    var nextBtn = document.getElementById('nextPageBtn');

    if (indicator) indicator.textContent = 'Page ' + currentPage + ' of ' + totalPages;
    if (prevBtn) prevBtn.disabled = (currentPage === 1);
    if (nextBtn) nextBtn.disabled = (currentPage === totalPages);
}

// =====================================================================
// INTERACTIVE CORRIDOR OPERATIONS HUB (6 FEATURES)
// =====================================================================
function initInteractiveTransitHub() {
    initRouteCalculator();
    initChaloAccuracyMeter();
    initAccessibilityScorecard();
    initCrowdDensitySlider();
    initCommuterReportingFeed();
}

// ---------------------------------------------------------------------
// 2. Route, Fare & Peak-Hour Delay Calculator
// ---------------------------------------------------------------------
function initRouteCalculator() {
    var originSelect = document.getElementById('originSelect');
    var destSelect = document.getElementById('destSelect');
    var calcBtn = document.getElementById('calcRouteBtn');

    if (!originSelect || !destSelect || !calcBtn) return;

    var routeMatrix = {
        "Malad Station (W) -> Ismail Yusuf College": {
            offPeak: "16 mins", peak: "42 mins", delay: "+26 mins", fare: "₹6 (Non-AC) / ₹10 (AC)",
            routes: ["Route 202", "Route 203", "Route 459"],
            note: "📍 Bottlenecks at SV Road Mith Chowki & Jogeshwari West flyover during 8:00–10:30 AM college rush."
        },
        "Malad Station (W) -> Jogeshwari Station": {
            offPeak: "14 mins", peak: "36 mins", delay: "+22 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 202", "Route 203"],
            note: "📍 Severe choke point near Oshiwara bridge and SV Road signal."
        },
        "Malad Station (W) -> Andheri Station": {
            offPeak: "24 mins", peak: "55 mins", delay: "+31 mins", fare: "₹10 (Non-AC) / ₹15 (AC)",
            routes: ["Route 202", "Route 459"],
            note: "📍 Major delay crossing Jogeshwari flyover and Andheri subway junctions."
        },
        "Malad Station (W) -> Mindspace Malad": {
            offPeak: "8 mins", peak: "20 mins", delay: "+12 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 203", "Route 290"],
            note: "📍 Link Road commercial corridor; high passenger turnaround at Inorbit Mall stop."
        },
        "Mith Chowki -> Ismail Yusuf College": {
            offPeak: "14 mins", peak: "38 mins", delay: "+24 mins", fare: "₹6 (Non-AC) / ₹10 (AC)",
            routes: ["Route 202", "Route 203"],
            note: "📍 Mith Chowki flyover construction causes 15+ min queueing during morning rush."
        },
        "Mith Chowki -> Jogeshwari Station": {
            offPeak: "12 mins", peak: "32 mins", delay: "+20 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 202", "Route 203"],
            note: "📍 Signal delay at Behram Baug junction on SV Road."
        },
        "Mith Chowki -> Andheri Station": {
            offPeak: "22 mins", peak: "48 mins", delay: "+26 mins", fare: "₹10 (Non-AC) / ₹15 (AC)",
            routes: ["Route 202", "Route 459"],
            note: "📍 High traffic density along Link Road and SV Road intersection."
        },
        "Mith Chowki -> Mindspace Malad": {
            offPeak: "6 mins", peak: "15 mins", delay: "+9 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 203"],
            note: "📍 Direct connection down Link Road; mild queue at Mindspace signal."
        },
        "Goregaon Bus Depot -> Ismail Yusuf College": {
            offPeak: "9 mins", peak: "25 mins", delay: "+16 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 202", "Route 345", "Route 459"],
            note: "📍 Direct connectivity via Western Express Highway; bus departure delays from depot bay."
        },
        "Goregaon Bus Depot -> Jogeshwari Station": {
            offPeak: "10 mins", peak: "24 mins", delay: "+14 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 202", "Route 345"],
            note: "📍 Moderate delay near Goregaon Flyover exit into SV Road."
        },
        "Goregaon Bus Depot -> Andheri Station": {
            offPeak: "18 mins", peak: "40 mins", delay: "+22 mins", fare: "₹10 (Non-AC) / ₹12 (AC)",
            routes: ["Route 345", "Route 459"],
            note: "📍 Heavy bottleneck on WEH near Hub Mall and Gundavali metro station."
        },
        "Goregaon Bus Depot -> Mindspace Malad": {
            offPeak: "12 mins", peak: "28 mins", delay: "+16 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 203", "Route 459"],
            note: "📍 Westbound vehicles face delays at Goregaon railway level/subway crossing."
        },
        "Oshiwara -> Ismail Yusuf College": {
            offPeak: "11 mins", peak: "29 mins", delay: "+18 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 203", "Route 459"],
            note: "📍 Good road conditions on Link Road; choke point at Jogeshwari West link bridge."
        },
        "Oshiwara -> Jogeshwari Station": {
            offPeak: "8 mins", peak: "20 mins", delay: "+12 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 203"],
            note: "📍 Short transit distance; rickshaw halting causes stop congestion."
        },
        "Oshiwara -> Andheri Station": {
            offPeak: "16 mins", peak: "38 mins", delay: "+22 mins", fare: "₹6 (Non-AC) / ₹10 (AC)",
            routes: ["Route 203", "Route 459"],
            note: "📍 Heavy peak hour delay near D.N. Nagar Metro interchange."
        },
        "Oshiwara -> Mindspace Malad": {
            offPeak: "10 mins", peak: "22 mins", delay: "+12 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 203"],
            note: "📍 Northbound corridor runs faster; slight delay near Infiniti Mall."
        },
        "Jogeshwari (E) -> Ismail Yusuf College": {
            offPeak: "5 mins", peak: "14 mins", delay: "+9 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 202", "Route 345"],
            note: "📍 Immediate neighborhood connection; pedestrian spillover near WEH highway slip."
        },
        "Jogeshwari (E) -> Jogeshwari Station": {
            offPeak: "6 mins", peak: "16 mins", delay: "+10 mins", fare: "₹6 (Non-AC) / ₹6 (AC)",
            routes: ["Route 202", "Route 345"],
            note: "📍 Severe east-west railway subway bottleneck with narrow carriage width."
        },
        "Jogeshwari (E) -> Andheri Station": {
            offPeak: "12 mins", peak: "30 mins", delay: "+18 mins", fare: "₹6 (Non-AC) / ₹10 (AC)",
            routes: ["Route 345", "Route 459"],
            note: "📍 Western Express Highway south-bound queue near Bisleri junction."
        },
        "Jogeshwari (E) -> Mindspace Malad": {
            offPeak: "20 mins", peak: "46 mins", delay: "+26 mins", fare: "₹10 (Non-AC) / ₹15 (AC)",
            routes: ["Route 202", "Route 203"],
            note: "📍 Cross-corridor trip traversing east-west subway and busy SV Road market zone."
        }
    };

    function updateCalculator() {
        var origin = originSelect.value;
        var dest = destSelect.value;
        var key = origin + ' -> ' + dest;

        var data = routeMatrix[key];
        if (!data) {
            // Default calculation if identical or unlisted
            data = {
                offPeak: "12 mins",
                peak: "30 mins",
                delay: "+18 mins",
                fare: "₹6 (Non-AC) / ₹10 (AC)",
                routes: ["Route 202", "Route 203"],
                note: "📍 Standard corridor travel. Expect delays at primary traffic junctions during peak periods."
            };
        }

        var resOffPeak = document.getElementById('resOffPeak');
        var resPeak = document.getElementById('resPeak');
        var resDelay = document.getElementById('resDelay');
        var resFare = document.getElementById('resFare');
        var resBusRoutes = document.getElementById('resBusRoutes');
        var resRouteNote = document.getElementById('resRouteNote');

        if (resOffPeak) resOffPeak.textContent = data.offPeak;
        if (resPeak) resPeak.textContent = data.peak;
        if (resDelay) resDelay.textContent = data.delay;
        if (resFare) resFare.textContent = data.fare;
        if (resRouteNote) resRouteNote.textContent = data.note;

        if (resBusRoutes) {
            resBusRoutes.innerHTML = '';
            data.routes.forEach(function(r) {
                var badge = document.createElement('span');
                badge.className = 'route-badge';
                badge.textContent = r;
                resBusRoutes.appendChild(badge);
            });
        }
    }

    calcBtn.addEventListener('click', updateCalculator);
    originSelect.addEventListener('change', updateCalculator);
    destSelect.addEventListener('change', updateCalculator);
}

// ---------------------------------------------------------------------
// 3. Chalo App ETA vs. Ground Reality Accuracy Meter
// ---------------------------------------------------------------------
function initChaloAccuracyMeter() {
    var stopSelect = document.getElementById('chaloStopSelect');
    if (!stopSelect) return;

    var accuracyData = {
        "Malad Station": {
            appEta: "6 Mins",
            groundEta: "24 Mins",
            badgeText: "⚠️ High Latency (+18 Mins traffic delay)",
            variance: 75,
            badgeClass: "warn",
            desc: "App shows 6 mins but bus is held at SV Road signal. Bus GPS frequency drops due to high-rise building interference and narrow feeder lanes."
        },
        "Ismail Yusuf College": {
            appEta: "8 Mins",
            groundEta: "22 Mins",
            badgeText: "⚠️ Moderate Latency (+14 Mins traffic delay)",
            variance: 65,
            badgeClass: "warn",
            desc: "Buses get trapped at Jogeshwari WEH junction. App ETA timer freezes or increments while the bus is stationary in unmonitored signals."
        },
        "Goregaon Depot": {
            appEta: "5 Mins",
            groundEta: "9 Mins",
            badgeText: "🟢 Low Latency / Accurate (+4 Mins delay)",
            variance: 28,
            badgeClass: "good",
            desc: "Depot starters actively log departures, resulting in the highest tracking accuracy along the entire corridor with minimal signal loss."
        },
        "Jogeshwari Station": {
            appEta: "7 Mins",
            groundEta: "26 Mins",
            badgeText: "🚨 Critical Latency (+19 Mins traffic delay)",
            variance: 82,
            badgeClass: "crit",
            desc: "Encroachments and auto-rickshaw halting near east subway entrance cause unpredictable 20+ minute holding times not reflected in app algorithm."
        }
    };

    function updateMeter() {
        var selected = stopSelect.value;
        var item = accuracyData[selected];
        if (!item) return;

        var appDisplay = document.getElementById('appEtaDisplay');
        var groundDisplay = document.getElementById('groundEtaDisplay');
        var statusBadge = document.getElementById('accuracyStatusBadge');
        var varianceLabel = document.getElementById('accuracyVarianceLabel');
        var progressBar = document.getElementById('latencyProgressBar');
        var detailText = document.getElementById('accuracyDetailText');

        if (appDisplay) appDisplay.textContent = item.appEta;
        if (groundDisplay) groundDisplay.textContent = item.groundEta;
        if (statusBadge) statusBadge.textContent = item.badgeText;
        if (varianceLabel) varianceLabel.textContent = 'Variance: ' + item.variance + '%';
        if (progressBar) progressBar.style.width = item.variance + '%';
        if (detailText) detailText.textContent = item.desc;
    }

    stopSelect.addEventListener('change', updateMeter);
}

// ---------------------------------------------------------------------
// 4. Bus Stop Accessibility Scorecard Widget
// ---------------------------------------------------------------------
function initAccessibilityScorecard() {
    var tabs = document.querySelectorAll('.score-tab');
    var container = document.getElementById('scorecardContent');
    if (!tabs.length || !container) return;

    var stopsData = {
        "iy-college": {
            title: "Ismail Yusuf College Stop",
            amenities: [
                { name: "Covered Shelter", available: true },
                { name: "Digital ETA Route Board", available: false },
                { name: "Wheelchair / Senior Ramp", available: false },
                { name: "Night Lighting", available: true },
                { name: "Seating Benches", available: true }
            ],
            score: "3.2 / 5.0",
            stars: "★★★☆☆",
            summary: "Dedicated student shelter exists with night lighting, but curb height is steep (14 inches) making wheelchair and elderly boarding perilous. No digital ETA board installed."
        },
        "malad-stn": {
            title: "Malad Station (W) Stop",
            amenities: [
                { name: "Covered Shelter", available: true },
                { name: "Digital ETA Route Board", available: false },
                { name: "Wheelchair / Senior Ramp", available: false },
                { name: "Night Lighting", available: true },
                { name: "Seating Benches", available: false }
            ],
            score: "2.4 / 5.0",
            stars: "★★☆☆☆",
            summary: "Extreme pedestrian volume. Shelter roof is narrow; bench seating removed to accommodate queues. Lack of ramp creates severe boarding hazards during morning peak."
        },
        "goregaon-depot": {
            title: "Goregaon Bus Depot",
            amenities: [
                { name: "Covered Shelter", available: true },
                { name: "Digital ETA Route Board", available: true },
                { name: "Wheelchair / Senior Ramp", available: true },
                { name: "Night Lighting", available: true },
                { name: "Seating Benches", available: true }
            ],
            score: "4.8 / 5.0",
            stars: "★★★★★",
            summary: "Highest standard infrastructure on corridor. Covered bays, tactile paving, wheelchair curb ramp, well-maintained benches, and functional schedule boards."
        },
        "jogeshwari-caves": {
            title: "Jogeshwari Caves Road Junction",
            amenities: [
                { name: "Covered Shelter", available: false },
                { name: "Digital ETA Route Board", available: false },
                { name: "Wheelchair / Senior Ramp", available: false },
                { name: "Night Lighting", available: true },
                { name: "Seating Benches", available: false }
            ],
            score: "1.6 / 5.0",
            stars: "★☆☆☆☆",
            summary: "Deficient infrastructure. No passenger canopy or seats. Commuters and students stand under open sun/rain directly on the carriageway edge."
        }
    };

    function renderScorecard(stopKey) {
        var data = stopsData[stopKey];
        if (!data) return;

        var html = '<div class="amenities-grid">';
        data.amenities.forEach(function(item) {
            var tagClass = item.available ? 'status-tag yes' : 'status-tag no';
            var tagText = item.available ? 'Yes 🟢' : 'No 🔴';
            html += '<div class="amenity-card">' +
                        '<span class="amenity-name">' + item.name + '</span>' +
                        '<span class="' + tagClass + '">' + tagText + '</span>' +
                    '</div>';
        });
        html += '</div>';

        html += '<div class="score-summary-card">' +
                    '<div class="score-rating-header">' +
                        '<div class="score-rating-val">' +
                            '<span>' + data.score + '</span>' +
                            '<span class="score-stars">' + data.stars + '</span>' +
                        '</div>' +
                        '<span class="badge" style="background:rgba(255,255,255,0.1);color:#e2e8f0;">Field Verified Audit</span>' +
                    '</div>' +
                    '<p class="score-field-note"><strong>Field Summary:</strong> ' + data.summary + '</p>' +
                '</div>';

        container.innerHTML = html;
    }

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            var stopKey = tab.getAttribute('data-stop');
            renderScorecard(stopKey);
        });
    });

    // Initial render
    renderScorecard('iy-college');
}

// ---------------------------------------------------------------------
// 5. Peak-Hour Crowd Density Heatmap Slider
// ---------------------------------------------------------------------
function initCrowdDensitySlider() {
    var slider = document.getElementById('crowdTimeSlider');
    if (!slider) return;

    var timeDisplay = document.getElementById('crowdTimeDisplay');
    var phaseBadge = document.getElementById('crowdPhaseBadge');
    var crowdPct = document.getElementById('crowdPercentage');
    var meterFill = document.getElementById('crowdMeterFill');
    var conditionHeadline = document.getElementById('crowdHeadline');
    var conditionText = document.getElementById('crowdDescription');
    var conditionBox = document.getElementById('crowdConditionBox');

    function formatTime(val) {
        var hour = Math.floor(val);
        var minutes = (val % 1 !== 0) ? '30' : '00';
        var period = (hour >= 12) ? 'PM' : 'AM';
        var displayHour = hour;
        if (displayHour > 12) displayHour -= 12;
        if (displayHour === 0) displayHour = 12;
        var paddedHour = (displayHour < 10 ? '0' : '') + displayHour;
        return paddedHour + ':' + minutes + ' ' + period;
    }

    function getCrowdProfile(val) {
        if (val < 7.5) {
            return {
                occupancy: 36,
                badge: "Early Morning Start",
                headline: "🟢 Low Passenger Volume & Ample Seating",
                desc: formatTime(val) + ": Minimal commuter footfall. Buses departing Goregaon Depot have empty seats; boarding takes under 1 minute.",
                color: "#22c55e",
                badgeBg: "rgba(34, 197, 94, 0.2)",
                badgeBorder: "rgba(34, 197, 94, 0.4)",
                badgeColor: "#86efac"
            };
        } else if (val < 8.0) {
            return {
                occupancy: 62,
                badge: "Early Student Influx",
                headline: "🟡 Moderate Congestion Building",
                desc: formatTime(val) + ": Junior college students begin arriving at IY College Stop. Standing room available; bus frequency running on schedule.",
                color: "#eab308",
                badgeBg: "rgba(234, 179, 8, 0.2)",
                badgeBorder: "rgba(234, 179, 8, 0.4)",
                badgeColor: "#fde047"
            };
        } else if (val <= 9.5) {
            var pct = (val === 8.5) ? 94 : (val === 9.0 ? 96 : 86);
            return {
                occupancy: pct,
                badge: "Peak Morning Rush (Crush Load)",
                headline: "🚨 Extreme Congestion & Footboard Travel",
                desc: formatTime(val) + ": Peak Morning Rush – Footboard travel observed, high student density near college stops. Boarding wait exceeds 25–30 minutes.",
                color: "#ef4444",
                badgeBg: "rgba(239, 68, 68, 0.2)",
                badgeBorder: "rgba(239, 68, 68, 0.4)",
                badgeColor: "#fca5a5"
            };
        } else if (val <= 11.0) {
            return {
                occupancy: 68,
                badge: "Tapering Morning Rush",
                headline: "🟡 Decreasing Crowds & Normalized Headways",
                desc: formatTime(val) + ": Lectures underway; office commuters cleared. Bus boarding queues shrink to 10–12 minutes.",
                color: "#eab308",
                badgeBg: "rgba(234, 179, 8, 0.2)",
                badgeBorder: "rgba(234, 179, 8, 0.4)",
                badgeColor: "#fde047"
            };
        } else if (val <= 12.5) {
            return {
                occupancy: 42,
                badge: "Midday Off-Peak",
                headline: "🟢 Free Flow & Comfortable Boarding",
                desc: formatTime(val) + ": Midday corridor operations run smoothly. Seat availability on Routes 202 and 203 exceeds 40%.",
                color: "#22c55e",
                badgeBg: "rgba(34, 197, 94, 0.2)",
                badgeBorder: "rgba(34, 197, 94, 0.4)",
                badgeColor: "#86efac"
            };
        } else if (val <= 14.5) {
            return {
                occupancy: 66,
                badge: "Afternoon Shift Dismissal",
                headline: "🟡 Student Departure Surge",
                desc: formatTime(val) + ": Degree and junior college lectures dismiss. Moderate crowd surge at Ismail Yusuf College stop with fast turnaround.",
                color: "#eab308",
                badgeBg: "rgba(234, 179, 8, 0.2)",
                badgeBorder: "rgba(234, 179, 8, 0.4)",
                badgeColor: "#fde047"
            };
        } else if (val <= 16.5) {
            return {
                occupancy: 48,
                badge: "Afternoon Lull",
                headline: "🟢 Light Traffic & On-Time Performance",
                desc: formatTime(val) + ": Smooth transit along SV Road. Minimal delay (+4 mins) between Malad Station and Jogeshwari.",
                color: "#22c55e",
                badgeBg: "rgba(34, 197, 94, 0.2)",
                badgeBorder: "rgba(34, 197, 94, 0.4)",
                badgeColor: "#86efac"
            };
        } else if (val <= 19.5) {
            return {
                occupancy: 92,
                badge: "Peak Evening Rush",
                headline: "🚨 Evening Crush Load & Gridlock",
                desc: formatTime(val) + ": Peak Evening Commute – Dense passenger volume heading westward. Severe bottlenecks at Mith Chowki and Link Road; 35+ minute delays.",
                color: "#ef4444",
                badgeBg: "rgba(239, 68, 68, 0.2)",
                badgeBorder: "rgba(239, 68, 68, 0.4)",
                badgeColor: "#fca5a5"
            };
        } else {
            return {
                occupancy: 60,
                badge: "Late Evening Dissipation",
                headline: "🟡 Tapering Night Volume",
                desc: formatTime(val) + ": Evening rush winds down; normal transit intervals restored with light congestion near railway station gates.",
                color: "#eab308",
                badgeBg: "rgba(234, 179, 8, 0.2)",
                badgeBorder: "rgba(234, 179, 8, 0.4)",
                badgeColor: "#fde047"
            };
        }
    }

    function updateSlider() {
        var val = parseFloat(slider.value);
        var timeStr = formatTime(val);
        var profile = getCrowdProfile(val);

        if (timeDisplay) timeDisplay.textContent = timeStr;
        if (phaseBadge) {
            phaseBadge.textContent = profile.badge;
            phaseBadge.style.backgroundColor = profile.badgeBg;
            phaseBadge.style.borderColor = profile.badgeBorder;
            phaseBadge.style.color = profile.badgeColor;
        }
        if (crowdPct) {
            var labelType = profile.occupancy > 75 ? ' (Crush Load)' : (profile.occupancy >= 50 ? ' (Moderate)' : ' (Low)');
            crowdPct.textContent = profile.occupancy + '%' + labelType;
            crowdPct.style.color = profile.color;
        }
        if (meterFill) {
            meterFill.style.width = profile.occupancy + '%';
        }
        if (conditionHeadline) conditionHeadline.textContent = profile.headline;
        if (conditionText) conditionText.textContent = profile.desc;
        if (conditionBox) conditionBox.style.borderLeftColor = profile.color;
    }

    slider.addEventListener('input', updateSlider);
}

// ---------------------------------------------------------------------
// 6. Public Commuter Issue Reporting & Community Feed
// ---------------------------------------------------------------------
function initCommuterReportingFeed() {
    var form = document.getElementById('commuterReportForm');
    var feedContainer = document.getElementById('communityFeedContainer');
    var countBadge = document.getElementById('reportCountBadge');
    var toast = document.getElementById('reportToast');

    if (!feedContainer) return;

    var reports = [
        {
            name: "Aakash Verma (TY CS Student)",
            route: "Route 202",
            stop: "Ismail Yusuf College Stop",
            issue: "Overcrowding",
            comment: "Bus skipped the stop entirely at 8:40 AM because it was packed beyond capacity. Had to wait 25 mins for the next 203.",
            time: "15 mins ago"
        },
        {
            name: "Priya Nair (Daily Commuter)",
            route: "Route 203",
            stop: "Mith Chowki Junction",
            issue: "App Tracking Fail",
            comment: "Chalo app indicated 4 mins arrival, but GPS stopped moving for 18 minutes near flyover construction.",
            time: "42 mins ago"
        },
        {
            name: "Suresh Kadam (Senior Citizen)",
            route: "Route 459",
            stop: "Goregaon Bus Depot",
            issue: "Boarding Hazard",
            comment: "High floor step makes it extremely difficult for senior citizens to climb without a platform ramp.",
            time: "1 hour ago"
        },
        {
            name: "Neha Gupta (Student)",
            route: "Route 345",
            stop: "Jogeshwari Caves Road Junction",
            issue: "Broken Shelter",
            comment: "No shelter or shade during heavy rain; commuters forced to stand on the muddy road edge.",
            time: "2 hours ago"
        }
    ];

    function renderFeed() {
        feedContainer.innerHTML = '';
        reports.forEach(function(r) {
            var item = document.createElement('div');
            item.className = 'feed-report-item';
            item.innerHTML =
                '<div class="report-meta">' +
                    '<span class="report-author">' + r.name + '</span>' +
                    '<span class="report-time">' + r.time + '</span>' +
                '</div>' +
                '<div class="report-tags">' +
                    '<span class="report-tag-route">' + r.route + '</span>' +
                    '<span class="report-tag-stop">' + r.stop + '</span>' +
                    '<span class="report-tag-issue">' + r.issue + '</span>' +
                '</div>' +
                '<p class="report-comment">"' + r.comment + '"</p>';
            feedContainer.appendChild(item);
        });

        if (countBadge) {
            countBadge.textContent = reports.length + ' Reports Active';
        }
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var nameInput = document.getElementById('repName');
            var routeInput = document.getElementById('repRoute');
            var stopInput = document.getElementById('repStop');
            var issueInput = document.getElementById('repIssue');
            var commentInput = document.getElementById('repComment');

            if (!nameInput || !routeInput || !stopInput || !issueInput || !commentInput) return;

            var newReport = {
                name: nameInput.value.trim(),
                route: routeInput.value,
                stop: stopInput.value,
                issue: issueInput.value,
                comment: commentInput.value.trim(),
                time: "Just now"
            };

            reports.unshift(newReport);
            renderFeed();

            form.reset();

            if (toast) {
                toast.style.display = 'block';
                setTimeout(function() {
                    toast.style.display = 'none';
                }, 3500);
            }
        });
    }

    renderFeed();
}

