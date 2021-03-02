function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

class VkMember {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
}

class VkStruct {
    constructor() {
        this.name = ""; //without the Vk Prefix
        this.members = Array(); //all the Members
        this.sType = ""; //the sType of the Struct
    }
}

var ignoreStructs = [  //Structs to ignore WITHOUT the Vk Prefix
    "BaseInStructure",
    "BaseOutStructure"
];

var allStructs = Array();

codeBits = document.getElementsByTagName("code");
for (let item of codeBits) {
    if (item.getAttribute("data-lang") === "c++") {
        let text = item.innerText;
        if (text.substring(0, 14) === "// Provided by") {
            let lines = text.split("\n");
            lines.splice(0, 1);
            text = lines.join("\n");
            if (lines[0].substr(0, 14) === "typedef struct") {
                let struct = new VkStruct();

                struct.name = lines[0].split(" ")[2].substr(2); // set struct name

                if (!ignoreStructs.includes(struct.name)) {

                    lines.splice(0, 1);
                    lines.pop();
                    for (let line of lines) {
                        let parts = line.split(" ").filter(function (el) {
                            return el !== "";
                        });

                        let memberName = parts.pop().split("[")[0].split(";")[0];
                        let memberType = parts.join(" ");
                        let member = new VkMember(memberType, memberName);

                        struct.members.push(member); // add struct members

                        //console.log(memberType + " - " + memberName);
                    }

                    allStructs.push(struct);// add struct to allStructs

                    //console.log("### vk::" + struct.name+" - "+struct.id);
                }
            }
        }
    }

    if (item.innerText.substr(0, 18) === "VK_STRUCTURE_TYPE_") {
        if (allStructs.length > 0 && allStructs[allStructs.length - 1].sType === "")
            allStructs[allStructs.length - 1].sType = item.innerText;

        //console.log(item.innerText);
    }
}

// ################################################################
let outputDebug = false; // activate / deactivate Debug output
if (outputDebug) {
    let debutText = "";

    for (let item of allStructs) {
        debutText += item.name + " " + item.members.length + "\n" + item.sType + "\n\n";
    }

    console.log(debutText);
}

// ################################################################
let outputMockup = false; // activate / deactivate Mockup output
if (outputMockup) {
    let defaultValues = {
        "pNext": "defaultNext",
        "flags": "defaultFlag"
    };

    let outputText = "This is where you put a file header\n\n\n";

    for (let struct of allStructs) { // iterate over all vkStructs
        outputText += "\tHere starts a new Struct\n";
        outputText += "\tThe " + struct.name + " does not contain the Vk prefix. If you need the prefix, you have to write Vk" + struct.name + "\n";

        for (let member of struct.members) { // iterate over all vkMembers in a vkStruct
            outputText += "\t\tThis is where you put the " + member.name + " and the " + member.type + "\n" +
                "\t\tYou can also write some logic using these variables.\n";

            if (member.name === "sType")
                outputText += "\t\t\tIf the name is \"sType\", you can print out the " + struct.sType + "\n";

            if (defaultValues[member.name])
                outputText += "\t\t\tYou can also use " + defaultValues[member.name] + " as default value\n";

        }

        outputText += "\tThis is the end of a Struct\n\n\n";
    }

    outputText += "And this is the end of the file. The only thing left to do is to call:";

    download("someFileName.mocktemp", outputText);
}

// ################################################################
let outputReSharperCppBindings = true; // activate / deactivate ReSharper Cpp output
if (outputReSharperCppBindings) {
    let defaultValues={
        "pNext":"{}",
        "flags":"{}"
    };
    var savetext='<wpf:ResourceDictionary xml:space="preserve" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" xmlns:s="clr-namespace:System;assembly=mscorlib" xmlns:ss="urn:shemas-jetbrains-com:settings-storage-xaml" xmlns:wpf="http://schemas.microsoft.com/winfx/2006/xaml/presentation">\n';

    for (let struct of allStructs) { // iterate over all vkStructs
        //Generate id for struct
        let ID ="";
        for (let i = 0; i < 32; i++) {
            ID += Math.floor(Math.random()*16).toString(16);
        }
        ID=ID.toUpperCase(); // set struct ID

        savetext+=
            '\t<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/@KeyIndexDefined">True</s:Boolean>\n' +
            '\t<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Shortcut/@EntryValue">'+struct.name+'Init</s:String>\n' +
            '\t<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Text/@EntryValue">vk::'+struct.name+' $name$;&#xD;\n';

        for (let member of struct.members) { // iterate over all vkMembers in a vkStruct
            let defaultVal= defaultValues[member.name]?defaultValues[member.name]:""; //find default value

            if(member.name === "sType") // skips the sType member for the c++ bindings
                continue;

            savetext+='$name$.'+member.name+' = '+defaultVal+';&#xD;\n';
        }

        savetext+=
            '</s:String>\n' +
            '\t<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Reformat/@EntryValue">True</s:Boolean>\n' +
            '\t<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/ShortenQualifiedReferences/@EntryValue">True</s:Boolean>\n' +
            '\t<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Categories/=Vulkan/@EntryIndexedValue">Vulkan</s:String>\n' +
            '\t<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Applicability/=Live/@EntryIndexedValue">True</s:Boolean>\n' +
            '\t<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Scope/=F6696F8185506F41B9C4252540BE9C18/@KeyIndexDefined">True</s:Boolean>\n' +
            '\t<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Scope/=F6696F8185506F41B9C4252540BE9C18/Type/@EntryValue">InCppFile</s:String>\n' +
            '\t<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Field/=name/@KeyIndexDefined">True</s:Boolean>\n' +
            '\t<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Field/=name/Expression/@EntryValue">suggestVariableName()</s:String>\n' +
            '\t<s:Int64 x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Field/=name/Order/@EntryValue">0</s:Int64>\n\n\n';

    }

    savetext+='</wpf:ResourceDictionary>';

    download("VulkanTemplatesCpp.DotSettings",savetext);
}
/*


















*/