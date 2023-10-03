import { ApplicationSettings, EventData, Observable, View, getRootLayout } from '@nativescript/core'
import { overrideNativeLocale, loadLocaleJSON } from "@nativescript-community/l/localize";


export class HelloWorldModel extends Observable {
  private _counter: number
  private _message: string
  constructor() {
    super()

    // Initialize default values.
    this._counter = 42
    this.updateMessage()

    console.error(ApplicationSettings.getString('__app__language__'));
    
  }

  get message(): string {
    return this._message
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value
      this.notifyPropertyChange('message', value)
    }
  }

  languageFR(args: EventData) {
    let view : View = args.object as View;
    this._counter--
    this.updateMessage()
    try {

        const localeOverriddenSuccessfully = overrideNativeLocale("fr-FR"); 
        console.error("TO FR:", localeOverriddenSuccessfully);
        let json = require("~/i18n/fr.json")
        loadLocaleJSON(json)
        ApplicationSettings.setString('__app__language__', "fr")
    } catch (e) {
        console.error(e);

    }
  }

  languageEN(args: EventData) {
    let view : View = args.object as View;
    this._counter--
    this.updateMessage()
    try {

        const localeOverriddenSuccessfully = overrideNativeLocale("en-US"); 
        console.error("TO EN:", localeOverriddenSuccessfully);

        let json = require("~/i18n/en.default.json")
        loadLocaleJSON(json)

        ApplicationSettings.setString('__app__language__', "en")
    } catch (e) {
        console.error(e);

    }
  }

  navigate(args: EventData) {
    let view : View = args.object as View;
    view.page.frame.navigate("second/second-page")
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!'
    } else {
      this.message = `${this._counter} taps left`
    }
  }
}
