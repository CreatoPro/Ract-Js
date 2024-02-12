const registerEvent = (event, app, route) => {
  if(window.gtag){
    window.gtag("event", event, {
      app_name: app,
      screen_name: route,
    });
    console.log('success');
  }
};

export default registerEvent;
