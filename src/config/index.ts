import developmentConfigs from './env/dev.json';
import testingConfigs from './env/tst.json';
import stagingConfigs from './env/stg.json';
import productionConfigs from './env/prd.json';
// import RoutesConfig from './routes';

class AppConfig {
  config: { protocol: string; portApi: string; serverURL: string; portSocket: string; clientId: string; s3WebUrl: string; apiVersion: string; deepLink: string; recaptchaKey: string; restCountriesURL: string; defaultDateFormat: string; defaultTimeFormat: string; };
  // Routes: {
  //   Home: { _: string; }; ForgotPassword: { _: string; }; ResetPassword: { _: string; }; Service: { _: string; }; SignIn: { _: string; Admin: string; }; SignUp: { _: string; }; Dashboard: {
  //     _: string; Service: { _: string; }; Appointment: { _: string; }; // set configration for production docker environtment
  //     UploadedCertificate: { _: string; }; Setting: { _: string; }; Revenue: { _: string; }; Account: { _: string; }; DoctorManagement: {
  //       _: string; // set configration for development/testing docker environtment
  //     }; CustomizeNotification: { _: string; }; SystemNotification: { _: string; };
  //   };
  //   Login: { _: string; };
  // };
  constructor() {
    console.log(`Stage running: "${process.env.REACT_APP_STAGE}"`);
    // if (process.env === 'production') {
    if (process.env.REACT_APP_STAGE === 'production') {
      // set configration for production docker environtment
      this.config = productionConfigs;
    } else if (process.env.REACT_APP_STAGE === 'staging') {
      // set configration for staging docker environtment
      this.config = stagingConfigs;
    } else if (process.env.REACT_APP_STAGE === 'testing') {
      // set configration for development/testing docker environtment
      console.log('Loading testing configuration');
      this.config = testingConfigs;
    } else {
      this.config = developmentConfigs;
    }

    // this.Routes = RoutesConfig;
  }
  getEnv() {
    return process.env.REACT_APP_STAGE;
  }
  getConfig(env: string) {
    if (env === 'production') {
      // set configration for production docker environtment
      this.config = productionConfigs;
    } else if (env === 'staging') {
      // set configration for staging docker environtment
      this.config = stagingConfigs;
    } else if (env === 'testing') {
      // set configration for development/testing docker environtment
      this.config = developmentConfigs;
    }

    return this.config;
  }
  getDeepLink() {
    return this.config.deepLink;
  }
  getApiEndpoint() {
    return `${this.config.protocol}://${this.config.serverURL}:${this.config.portApi}/api/${this.config.apiVersion}`;
  }
  getSocketEndpoint() {
    return `${this.config.protocol}://${this.config.serverURL}:${this.config.portSocket}`;
  }
  getPaypalClientID() {
    return this.config.clientId;
  }
  getS3WebUrl() {
    return this.config.s3WebUrl;
  }
  getRecaptchaKey() {
    return this.config.recaptchaKey;
  }
  getDefaultDateFormat() {
    return this.config.defaultDateFormat;
  }
  getDefaultTimeFormat() {
    return this.config.defaultTimeFormat;
  }
}

export default new AppConfig();
