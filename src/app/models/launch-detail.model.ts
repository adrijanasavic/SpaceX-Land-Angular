export interface LaunchDetail {
  missionName: string;
  launchDate: string;
  rocket: {
    //Rocket Info
    name: string;
    //Rocket Info
    type: string;
    //Rocket Info
    totalFlights: number;
    //Rocket Info
    landingIntent: string;
    //Rocket Info
    landingSuccess: string;
    //Rocket Info
    reused: string;
    //Rocket Info
    payloads: [];
  };
  launchSite: string;
  launchSuccess: string;
  links: {
    missionImage: string;
    //Rocket Info
    flickr: [];
    // Medila -> Links
    redditCampaing: string;
    // Medila -> Links
    redditLaunch: string;
    // Medila -> Links
    redditRecovery: string;
    // Medila -> Links
    redditMedia: string;
    // Medila -> Links
    article: string;
    // Medila -> Links
    wikipedia: string;
    // Medila -> Video
    video: string;


  };
  details: string;
  crew: string;
}
