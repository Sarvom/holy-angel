//import "https://cdn.ethers.io/scripts/ethers-v3.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.4/axios.min.js";
import * as config from "./config.js";

export var campaignId="test run";
var inviteCode="undefined";
var domainName="undefined";
var creativeId="undefined";


function get_color_value(cs, category, color_name) {
    if(category in cs){
        let category_data = cs[category];
        let color_data = category_data[color_name];
        let color_value = color_data['value'];
        return color_value;
    }
    else{
        return;
    }    
}
function figma_json_to_ftd(json) {

    return new Promise(async (resolve, reject) => {
        try{
            const cs_data = JSON.parse(json);
            let cs_light = Object.keys(cs_data)
                .filter((key) => key.includes("-light"))
                .reduce((obj, key) => {
                obj = cs_data[key];
                return obj;
            }, {});
            let cs_dark = Object.keys(cs_data)
                .filter((key) => key.includes("-dark"))
                .reduce((obj, key) => {
                obj = cs_data[key];
                return obj;
            }, {});
        
            
            let colorsObj= `
            -- ftd.color base-:
            light: ${get_color_value(cs_light, "Background Colors", "base")}
            dark: ${get_color_value(cs_dark, "Background Colors", "base")}
        
            -- ftd.color step-1-:
            light: ${get_color_value(cs_light, "Background Colors", "step-1")}
            dark: ${get_color_value(cs_dark, "Background Colors", "step-1")}
        
            -- ftd.color step-2-:
            light: ${get_color_value(cs_light, "Background Colors", "step-2")}
            dark: ${get_color_value(cs_dark, "Background Colors", "step-2")}
        
            -- ftd.color overlay-:
            light: ${get_color_value(cs_light, "Background Colors", "overlay")}
            dark: ${get_color_value(cs_dark, "Background Colors", "overlay")}
        
            -- ftd.color code-:
            light: ${get_color_value(cs_light, "Background Colors", "code")}
            dark: ${get_color_value(cs_dark, "Background Colors", "code")}
        
            -- ftd.color border-:
            light: ${get_color_value(cs_light, "Standalone Colors", "border")}
            dark: ${get_color_value(cs_dark, "Standalone Colors", "border")}
        
            -- ftd.color border-strong-:
            light: ${get_color_value(cs_light, "Standalone Colors", "border-strong")}
            dark: ${get_color_value(cs_dark, "Standalone Colors", "border-strong")}
        
            -- ftd.color text-:
            light: ${get_color_value(cs_light, "Standalone Colors", "text")}
            dark: ${get_color_value(cs_dark, "Standalone Colors", "text")}
        
            -- ftd.color text-strong-:
            light: ${get_color_value(cs_light, "Standalone Colors", "text-strong")}
            dark: ${get_color_value(cs_dark, "Standalone Colors", "text-strong")}
        
            -- ftd.color shadow-:
            light: ${get_color_value(cs_light, "Standalone Colors", "shadow")}
            dark: ${get_color_value(cs_dark, "Standalone Colors", "shadow")}
        
            -- ftd.color scrim-:
            light: ${get_color_value(cs_light, "Standalone Colors", "scrim")}
            dark: ${get_color_value(cs_dark, "Standalone Colors", "scrim")}
        
            -- ftd.color cta-primary-base-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "base")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "base")}
        
            -- ftd.color cta-primary-hover-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "hover")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "hover")}
        
            -- ftd.color cta-primary-pressed-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "pressed")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "pressed")}
        
            -- ftd.color cta-primary-disabled-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "disabled")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "disabled")}
        
            -- ftd.color cta-primary-focused-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "focused")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "focused")}
        
            -- ftd.color cta-primary-border-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "border")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "border")}
        
            -- ftd.color cta-primary-text-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "text")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "text")}
        
            -- ftd.color cta-primary-text-disabled-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "text-disabled")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "text-disabled")}
        
            -- ftd.color cta-primary-border-disabled-:
            light: ${get_color_value(cs_light, "CTA Primary Colors", "border-disabled")}
            dark: ${get_color_value(cs_dark, "CTA Primary Colors", "border-disabled")}
        
            -- ftd.color cta-secondary-base-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "base")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "base")}
        
            -- ftd.color cta-secondary-hover-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "hover")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "hover")}
        
            -- ftd.color cta-secondary-pressed-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "pressed")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "pressed")}
        
            -- ftd.color cta-secondary-disabled-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "disabled")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "disabled")}
        
            -- ftd.color cta-secondary-focused-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "focused")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "focused")}
        
            -- ftd.color cta-secondary-border-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "border")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "border")}
        
            -- ftd.color cta-secondary-text-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "text")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "text")}
        
            -- ftd.color cta-secondary-text-disabled-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "text-disabled")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "text-disabled")}
        
            -- ftd.color cta-secondary-border-disabled-:
            light: ${get_color_value(cs_light, "CTA Secondary Colors", "border-disabled")}
            dark: ${get_color_value(cs_dark, "CTA Secondary Colors", "border-disabled")}
        
         
            -- ftd.color cta-tertiary-base-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "base")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "base")}
        
            -- ftd.color cta-tertiary-hover-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "hover")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "hover")}
        
            -- ftd.color cta-tertiary-pressed-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "pressed")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "pressed")}
        
            -- ftd.color cta-tertiary-disabled-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "disabled")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "disabled")}
        
            -- ftd.color cta-tertiary-focused-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "focused")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "focused")}
        
            -- ftd.color cta-tertiary-border-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "border")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "border")}
        
            -- ftd.color cta-tertiary-text-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "text")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "text")}
        
            -- ftd.color cta-tertiary-text-disabled-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "text-disabled")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "text-disabled")}
        
            -- ftd.color cta-tertiary-border-disabled-:
            light: ${get_color_value(cs_light, "CTA Tertiary Colors", "border-disabled")}
            dark: ${get_color_value(cs_dark, "CTA Tertiary Colors", "border-disabled")}
        
            -- ftd.color cta-danger-base-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "base")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "base")}
        
            -- ftd.color cta-danger-hover-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "hover")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "hover")}
        
            -- ftd.color cta-danger-pressed-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "pressed")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "pressed")}
        
            -- ftd.color cta-danger-disabled-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "disabled")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "disabled")}
        
            -- ftd.color cta-danger-focused-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "focused")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "focused")}
        
            -- ftd.color cta-danger-border-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "border")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "border")}
        
            -- ftd.color cta-danger-text-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "text")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "text")}
        
            -- ftd.color cta-danger-text-disabled-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "text-disabled")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "text-disabled")}
        
            -- ftd.color cta-danger-border-disabled-:
            light: ${get_color_value(cs_light, "CTA Danger Colors", "border-disabled")}
            dark: ${get_color_value(cs_dark, "CTA Danger Colors", "border-disabled")}
        
        
            -- ftd.color accent-primary-:
            light: ${get_color_value(cs_light, "Accent Colors", "primary")}
            dark: ${get_color_value(cs_dark, "Accent Colors", "primary")}
        
            -- ftd.color accent-secondary-:
            light: ${get_color_value(cs_light, "Accent Colors", "secondary")}
            dark: ${get_color_value(cs_dark, "Accent Colors", "secondary")}
        
            -- ftd.color accent-tertiary-:
            light: ${get_color_value(cs_light, "Accent Colors", "tertiary")}
            dark: ${get_color_value(cs_dark, "Accent Colors", "tertiary")}
        
          
            -- ftd.color error-base-:
            light: ${get_color_value(cs_light, "Error Colors", "base")}
            dark: ${get_color_value(cs_dark, "Error Colors", "base")}
        
            -- ftd.color error-text-:
            light: ${get_color_value(cs_light, "Error Colors", "text")}
            dark: ${get_color_value(cs_dark, "Error Colors", "text")}
        
            -- ftd.color error-border-:
            light: ${get_color_value(cs_light, "Error Colors", "border")}
            dark: ${get_color_value(cs_dark, "Error Colors", "border")}
        
        
            -- ftd.color success-base-:
            light: ${get_color_value(cs_light, "Success Colors", "base")}
            dark: ${get_color_value(cs_dark, "Success Colors", "base")}
        
            -- ftd.color success-text-:
            light: ${get_color_value(cs_light, "Success Colors", "text")}
            dark: ${get_color_value(cs_dark, "Success Colors", "text")}
        
            -- ftd.color success-border-:
            light: ${get_color_value(cs_light, "Success Colors", "border")}
            dark: ${get_color_value(cs_dark, "Success Colors", "border")}
        
          
            -- ftd.color info-base-:
            light: ${get_color_value(cs_light, "Info Colors", "base")}
            dark: ${get_color_value(cs_dark, "Info Colors", "base")}
        
            -- ftd.color info-text-:
            light: ${get_color_value(cs_light, "Info Colors", "text")}
            dark: ${get_color_value(cs_dark, "Info Colors", "text")}
        
            -- ftd.color info-border-:
            light: ${get_color_value(cs_light, "Info Colors", "border")}
            dark: ${get_color_value(cs_dark, "Info Colors", "border")}
        
          
        
            -- ftd.color warning-base-:
            light: ${get_color_value(cs_light, "Warning Colors", "base")}
            dark: ${get_color_value(cs_dark, "Warning Colors", "base")}
        
            -- ftd.color warning-text-:
            light: ${get_color_value(cs_light, "Warning Colors", "text")}
            dark: ${get_color_value(cs_dark, "Warning Colors", "text")}
        
            -- ftd.color warning-border-:
            light: ${get_color_value(cs_light, "Warning Colors", "border")}
            dark: ${get_color_value(cs_dark, "Warning Colors", "border")}
        
          
            -- ftd.color custom-one-:
            light: ${get_color_value(cs_light, "Custom Colors", "one")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "one")}
        
            -- ftd.color custom-two-:
            light: ${get_color_value(cs_light, "Custom Colors", "two")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "two")}
        
            -- ftd.color custom-three-:
            light: ${get_color_value(cs_light, "Custom Colors", "three")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "three")}
        
            -- ftd.color custom-four-:
            light: ${get_color_value(cs_light, "Custom Colors", "four")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "four")}
        
            -- ftd.color custom-five-:
            light: ${get_color_value(cs_light, "Custom Colors", "five")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "five")}
        
            -- ftd.color custom-six-:
            light: ${get_color_value(cs_light, "Custom Colors", "six")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "six")}
        
            -- ftd.color custom-seven-:
            light: ${get_color_value(cs_light, "Custom Colors", "seven")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "seven")}
        
            -- ftd.color custom-eight-:
            light: ${get_color_value(cs_light, "Custom Colors", "eight")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "eight")}
        
            -- ftd.color custom-nine-:
            light: ${get_color_value(cs_light, "Custom Colors", "nine")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "nine")}
        
            -- ftd.color custom-ten-:
            light: ${get_color_value(cs_light, "Custom Colors", "ten")}
            dark: ${get_color_value(cs_dark, "Custom Colors", "ten")}
        
            `;
        
        const blocks = colorsObj.split('-- ftd.color');
        const trimmedBlocks = blocks.map(block => block.trim());
        const nonEmptyBlocks = trimmedBlocks.filter(block => block.length > 0);
        const result = nonEmptyBlocks.map(block => {
          const lines = block.split('\n');
          const obj = { colors: lines[0].trim().replace(/:/g, '') };
          lines.slice(1).forEach(line => {
            const [key, value] = line.split(':');        
            obj[key.trim()] = value.trim()
          });
          return obj;
        });
            resolve(result);
        }
        catch(e){
            alert("Error. Switching to default color scheme");           
            reject(e);
        }
        
    });   
}

window.onload = async function () { 
        readUrlParams();  
  }

  window.readUrlParams = async function readUrlParams() {

    var queryString = window.location.search;  
    var queryParameters = queryString.slice(1);    
    var parametersObject = {};

    queryParameters.split('&').forEach(function(parameter) {
      var keyValue = parameter.split('=');
      var key = decodeURIComponent(keyValue[0]);
      var value = decodeURIComponent(keyValue[1]);
      parametersObject[key] = value;
    });
    
    var cName = parametersObject['cname'];
    var inviteId = parametersObject['invite_id'];
    creativeId = parametersObject['cd'];
    var nftType=parametersObject['type'];
    domainName=cName;
    inviteCode=inviteId;

    window.ftd.set_value(
        `admint-io.github.io/Templates/texts#nft-type`,
        nftType
    );
    
    console.log("cname is ",cName);
    console.log("invite id is ",inviteId);
      
    fetchUiComponents(domainName).then((result)=>{
        if("colorSchemeUrl" in result.values[0]){
            fetchColorScheme(result.values[0].colorSchemeUrl).then((figmaJson)=>{
                figma_json_to_ftd(figmaJson).then((resultColorsObj)=>{
                    console.log("result colors object is ",resultColorsObj);  
                    console.log("starting to update ftd colors");  
                    resultColorsObj.forEach((obj)=>{
                        try{
                        var colors=obj.colors;        
                        if ("colors" in obj) {
                            delete obj["colors"];
                        }
                       if(obj.light != undefined && obj.light != "undefined"){
                        window.ftd.set_value(
                            `admint-io.github.io/Templates/colors#${colors}.light`,
                            obj.light
                        );
                       }
                       if(obj.dark != undefined && obj.dark != "undefined"){
                        window.ftd.set_value(
                            `admint-io.github.io/Templates/colors#${colors}.dark`,
                            obj.dark
                        );
                       }   

                        }
                        catch(e){console.error(e);}
                    }); 

                    console.log("ftd colors updated");  
                }).catch(error => {
                    console.error("Promise rejected : figma_json_to_ftd(), Reason : ",error);
                  });           
            }).catch(error => {
                console.error("Promise rejected : fetchColorScheme(), Reason : ",error);
              });   
        }
        else{
            reject("color scheme url key not included");
        }
        
    }).catch(error => {
        console.error("Promise rejected : fetchUiComponents(), Reason : ",error);
      });
  }

  window.fetchUiComponents = async function fetchUiComponents(domainName) {
    return new Promise(function(resolve, reject) {
        if(domainName != undefined){
            const url = `${config.DISTRIBUTION_BASE_BACKEND_URL}/sitedata/${domainName}`;
            const apiConfig = {
                headers: {
                  "Content-Type": "application/json"
                }
              };
            axios
            .get(url, apiConfig)
            .then((response) => {
                const respData = response.data;        
                if("values" in respData){   
                    if(respData.values.length>0){
                        if("campaignId" in respData.values[0]){
                            campaignId=respData.values[0].campaignId;
                        } 
                        if("bannerImageUrl" in respData.values[0]){
                            window.ftd.set_value(
                                "admint-io.github.io/Templates/images#hero-image-url",
                                respData.values[0].bannerImageUrl
                            );
                        } 
                        if("creativeDatas" in respData.values[0]){
                            updateCreativeDataUi(respData.values[0].creativeDatas);
                        }
                        resolve(respData);
                    }   
                    else{
                        reject("values is an empty array");
                    }                          
                }
                else{
                    reject("values key not included in response from server")
                }   
            })
            .catch((error) => {
                console.error(error);
                alert(error);
                reject(error);
            });
        }
        else{
            reject("domain name is undefined");
        }
      
      });
  }  

window.fetchColorScheme = async function fetchColorScheme(colorSchemeUrl) {
    return new Promise(async (resolve, reject) => {
        const url=`${config.COLOR_SCHEME_BASE_URL}/${colorSchemeUrl}`;
        const apiConfig = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        axios
        .get(url, apiConfig)
        .then((response) => {
            const respData=response.data;
            if (isValidJSON(respData)) {
                const respDataString=JSON.stringify(respData);
                resolve(respDataString);
              } else {
                reject("invalid JSON");
              }
        })
        .catch((error) => {
            console.error(error);                  
            alert(error);
            reject(error);
        });
    });            
}

window.updateCreativeDataUi = async function updateCreativeDataUi(creativeDatasArray) {
    console.log("creative datas array is ",creativeDatasArray,"creative id is ",creativeId);
    creativeDatasArray.forEach((obj)=>{
        if(obj.creativeId==creativeId){
            if("imageUrl" in obj){
                window.ftd.set_value(
                    "admint-io.github.io/Templates/images#nft-image-url",
                    obj.imageUrl
                );
            }            
        }
    })
}

window.isValidJSON = async function isValidJSON(response) {
    try {
        JSON.parse(response);
        return true;
      } catch (error) {
        return false;
      }
}


