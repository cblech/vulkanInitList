# Vulkan Struct Initialisation Templates

This repository contains ReSharper C++ Templates for Vulkan Structs. It supports both vulkan.h and vulkan.hpp 

https://user-images.githubusercontent.com/11379989/109603741-8ecf8000-7b22-11eb-804d-8945789038d3.mp4

## Installation ReSharper C++

- Save your desired `.DotSettings` file from the Releases somewhere on your PC
- In Visual Studio open the Template Explorer. `Extensions` -> `ReSharper` -> `Tools` -> `Template Explorer...`
- Make sure, you are in the `Live Templates` Tab
- Click the `Import...` button on the top of the Template Explorer.
- Navigate to the `.DotSettings` file, select it and click on Open.
- You should now see the Message: Successfully imported 588 templates

## Build it yourself

It is incredibly easy to build this yourself. You dont even need any kind of compiler or special Software. 
All you need is a reasonably new Web Browser with JavaScript enabled. 

- Download this Repository to your PC.
- Take a look at the `generateTemplate.js` file and modify it to your desire.
- Open `VulkanSpec.html` in a Web Browser. Give it a second to load the file, it is quite big.
- Click the big `Generate` button. Give it another second to generate the Template file.
- Your Browser should Prompt you to "Download" a file. Save it somewhere
- Now you can install this file (see the Installation section above)

## Bug Reports

I haven't done any extensive testing on this. If you find a bug or another problem please open an Issue 
