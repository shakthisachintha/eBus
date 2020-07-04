# eBus
This is an automatic bus ticketing solution using NFC tags and smartphones.<br>
Mobile application is developed by using React-Native.

#### Libraries Used
* [React Native Paper](https://callstack.github.io/react-native-paper/index.html) UI Component Library

#### Installation Guide
1. clone the project
2. run ``` npm install ``` on the project folder it will install all the dependencies
3. run ``` npx react-native run-android ``` to run the project on AVD

##### Bug Fix in node_modules
1. follow the installation guide and install all the node modules required
2. locate the file ``` node_modules\react-native-nfc\android\src\main\java\com\novadart\reactnativenfc\ReactNativeNFCPackage.java ```
3. comment out  the line **21** ` @override `
4. thi file should look like this 

```
package com.novadart.reactnativenfc;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ReactNativeNFCPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>(1);
        modules.add(new ReactNativeNFCModule(reactContext));
        return modules;
    }

    // @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}


```

