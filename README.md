# Vulkan Initializer List

This repository contains ReSharper C++ Templates for Vulkan Structs. It currently only supports the C++ bindings of Vulkan. 

https://user-images.githubusercontent.com/11379989/109603741-8ecf8000-7b22-11eb-804d-8945789038d3.mp4

## Installation

- Save `VulkanStructTemplates.DotSettings` from this Repository somewhere on your PC
- In Visual Studio open the Template Explorer. `Extensions` -> `ReSharper` -> `Tools` -> `Template Explorer...`
- Make sure, you are in the `Live Templates` Tab
- Click the `Import...` button on the top of the Template Explorer.
- Navigate to the `VulkanStructTemplates.DotSettings` file, select it and click on Open.
- You should now see the Message: Successfully imported 590 templates

## Build it yourself

It is incredibly easy to build this yourself. You dont even need any kind of compiler or special Software. 
All you need is a reasonably new Web Browser with JavaScript enabled. 

- Download this Repository to your PC.
- Open `VulkanSpec.html` in a Web Browser. Give it a second to load the file, it is quite big.
- Click the big `Generate` button. Give it another second to generate the Template file.
- Your Browser should Prompt you to "Download" a file called `VulkanStructTemplates.DotSettings`. Save it somewhere
- Now you can install this file (see the Installation section above)

## Bug Reports

I haven't done any extensive testing on this. If you find a bug or another problem please open an Issue 
