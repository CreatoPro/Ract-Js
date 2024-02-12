import ApiService from "./ApiService";

class ThemeService {

    getActiveTheme() {
        console.log("ThemeService --> getActiveTheme()...");
        let activeTheme = sessionStorage['activeTheme'];
        if(!activeTheme) {
            ApiService.getActiveTheme()
            .then((res) => {
              console.log("ThemeService --> getActiveTheme()... Active Theme : "+JSON.stringify(res.data));
              if(res.data.data) {
                let _activeTheme =  res.data.data;
                sessionStorage.setItem('activeTheme', JSON.stringify(_activeTheme));
                this.setTheme(_activeTheme);
              }    
            },
            error => { //ErrorCB
                console.log("ThemeService --> getActiveTheme()... error =>"+JSON.stringify(error));
            });	
        }
        else {
            this.setTheme(JSON.parse(activeTheme));    
        }  
    }

    setTheme(activeTheme) { 
        console.log("ThemeService --> setTheme()..."+JSON.stringify(activeTheme)); 
        let bodyStyles = document.body.style;
        // const primaryColor = this.lightenDarkenColor(color, 0)
        // const primaryHoverColor = this.lightenDarkenColor(color, 20)
        // const primaryFocusColor = this.lightenDarkenColor(color, 80)
        // const secondaryColor = this.lightenDarkenColor(color, 20)
        // const secondaryHoverColor = this.lightenDarkenColor(color, 40)
        // const secondaryFocusColor = this.lightenDarkenColor(color, 100)
        // bodyStyles.setProperty('--primary-color', `${primaryColor}`)
        // bodyStyles.setProperty('--primary-hover-color', `${primaryHoverColor}`)
        // bodyStyles.setProperty('--primary-focus-color', `${primaryFocusColor}`)
        // bodyStyles.setProperty('--secondary-color',  `${secondaryColor}`)
        // bodyStyles.setProperty('--secondary-hover-color', `${secondaryHoverColor}`)
        // bodyStyles.setProperty('--secondary-focus-color', `${secondaryFocusColor}`)
        const themeColor = activeTheme?.color;
        if(themeColor) {
            bodyStyles.setProperty('--primary-color', `${themeColor['primary-color']}`)
            bodyStyles.setProperty('--secondary-color', `${themeColor['secondary-color']}`)
            bodyStyles.setProperty('--portlet-color1', `${themeColor['portlet-color1']}`)
            bodyStyles.setProperty('--portlet-color2', `${themeColor['portlet-color2']}`)
            bodyStyles.setProperty('--portlet-color3', `${themeColor['portlet-color3']}`)
            bodyStyles.setProperty('--portlet-color4', `${themeColor['portlet-color4']}`)
            bodyStyles.setProperty('--portlet-color5', `${themeColor['portlet-color5']}`)
            bodyStyles.setProperty('--portlet-color6', `${themeColor['portlet-color6']}`)
            bodyStyles.setProperty('--portlet-color7', `${themeColor['portlet-color7']}`)
            bodyStyles.setProperty('--portlet-color8', `${themeColor['portlet-color8']}`)
            bodyStyles.setProperty('--portlet-color9', `${themeColor['portlet-color9']}`)
            bodyStyles.setProperty('--portlet-color10', `${themeColor['portlet-color10']}`)
            bodyStyles.setProperty('--portlet-color11', `${themeColor['portlet-color11']}`)
            bodyStyles.setProperty('--portlet-color12', `${themeColor['portlet-color12']}`)
        }
    }

    lightenDarkenColor(col, amt) {
        if(col === null || col === undefined) {
            return null;
        }
        let usePound = false;
      
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
     
        let num = parseInt(col,16);
     
        let r = (num >> 16) + amt;
     
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
     
        let b = ((num >> 8) & 0x00FF) + amt;
     
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
     
        let g = (num & 0x0000FF) + amt;
     
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
     
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
      
    }

}

export default new ThemeService();