# Vulkan Struct Initialization Templates

This repository contains ReSharper C++ Templates for Vulkan Structs. It supports `vulkan.h`, `vulkan.hpp` and `vulkan.hpp` with designated initializers

https://user-images.githubusercontent.com/11379989/109603741-8ecf8000-7b22-11eb-804d-8945789038d3.mp4

## Installation ReSharper C++

- Save your desired `.DotSettings` file from the Releases somewhere on your PC
- In Visual Studio, open the Template Explorer. `Extensions` → `ReSharper` → `Tools` → `Template Explorer...`
- Make sure, you are in the `Live Templates` Tab
- Click the `Import...` button on the top of the Template Explorer.
- Navigate to the `.DotSettings` file, select it and click on Open.
- You should now see the Message: Successfully imported 588 templates

## Build it yourself

It is incredibly easy to build this yourself. You don't even need any kind of compiler or special Software. 
All you need is a reasonably new Web Browser with JavaScript enabled. 

- Download this Repository to your PC.
- Take a look at the `generateTemplate.js` file and modify it to your desire.
- Open a `VulkanSpec_X.X.X.html` in a Web Browser. You can either use one of the already provided ones or download a specific one as described below. Allow it a second to load the file, it is huge.
- Click the big `Generate` button. Allow it another second to generate the Template file.
- Your Browser should prompt you to "Download" a file. Save it somewhere
- Now you can install this file (see the Installation section above)

## Using a different Vulkan Spec

If you want to use a different Vulkan Spec, you can download it from the Khronos Website. You can find available specs here: https://registry.khronos.org/vulkan/specs/. Make sure to download the full HTML version. E.g.: The Vulkan 1.0 Core without extensions can be found here: https://registry.khronos.org/vulkan/specs/1.0/html/vkspec.html

After downloading the file, you need to add the following code to the html.
```html
<!-- Button for template generation -->
<button style="font-size:80px" onclick="
    var script = document.createElement('script');
    script.src = 'generateTemplate.js';
    document.body.appendChild(script);
">Generate</button>
<!--/ Button for template generation -->
```

You can add it anywhere in the `<body>` tag. I recommend adding it directly after the title. (You can search for `</h1>` in the file)

## Bug Reports

I haven't done any extensive testing on this. If you find a bug or another problem, please open an Issue 