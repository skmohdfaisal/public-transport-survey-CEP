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
