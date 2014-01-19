/* net.bytedoc.Helper
 * Javascript Helper methods
 */

// Basis-Objekt deklarieren, falls noch nicht vorhanden
if(!net) { var net = {} };
if(!net.bytedoc) { net.bytedoc = {} };

// Helper-Klasse deklarieren
net.bytedoc.Helper = {};

/*
 * net.bytedoc.Helper.createGuid
 * creates a GUID according to Version 4 RFC4122
 */
net.bytedoc.Helper.createGuid = function()
{
	// http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/**
 * net.bytedoc.Helper.pathToIndex
 * if index is a "path", then remove the slash from it
 */
net.bytedoc.Helper.pathToIndex = function(index) {
	// ensure that index is treates as a string
	index = index + "";
	return index.replace(/^\//g,'');
}
