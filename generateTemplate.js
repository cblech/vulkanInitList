function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

var defaultValues={
    "pNext":"{}",
    "flags":"{}"
};

var savetext='<wpf:ResourceDictionary xml:space="preserve" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" xmlns:s="clr-namespace:System;assembly=mscorlib" xmlns:ss="urn:shemas-jetbrains-com:settings-storage-xaml" xmlns:wpf="http://schemas.microsoft.com/winfx/2006/xaml/presentation">\n';

codeBits = document.getElementsByTagName("code");
for (let item of codeBits) {
    if (item.getAttribute("data-lang") === "c++") {
        let text = item.innerText;
        if (text.substring(0, 14) === "// Provided by") {
            let lines = text.split("\n");
            lines.splice(0, 1);
            text = lines.join("\n");
            if (lines[0].substr(0, 14) === "typedef struct") {
                let symbol = lines[0].split(" ")[2];
                let symbolNoVk = symbol.substr(2);
                let ID = "";
                for (let i = 0; i < 32; i++) {
                    ID += Math.floor(Math.random()*16).toString(16);
                }
                ID=ID.toUpperCase();
                //console.log("### " + symbol+" - "+ID);

                savetext+=
                    '\t<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/@KeyIndexDefined">True</s:Boolean>\n' +
                    '\t<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Shortcut/@EntryValue">'+symbolNoVk+'Init</s:String>\n' +
                    '\t<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Text/@EntryValue">vk::'+symbolNoVk+' $name$;&#xD;\n';


                lines.splice(0, 1);
                lines.pop();
                for (let line of lines) {
                    let parts = line.split(" ").filter(function (el) {
                        return el !== "";
                    });

                    let memberName = parts.pop().split("[")[0].split(";")[0];
                    let memberType = parts.join(" ");
                    let defaultVal= defaultValues[memberName]?defaultValues[memberName]:"";

                    //console.log(memberType + " - " + memberName);

                    if(memberName === "sType") // skips the sType member for the c++ bindings
                        continue;

                    savetext+='$name$.'+memberName+' = '+defaultVal+';&#xD;\n';
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
                    '\t<s:Int64 x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/='+ID+'/Field/=name/Order/@EntryValue">0</s:Int64>\n\n\n'
            }
        }
    }
}

savetext+='</wpf:ResourceDictionary>';

download("VulkanStructTemplates.DotSettings",savetext);
