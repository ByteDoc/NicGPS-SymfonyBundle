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
 * erzeugt eine GUID nach Version 4 RFC4122
 */
net.bytedoc.Helper.createGuid = function()
{
	// http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
