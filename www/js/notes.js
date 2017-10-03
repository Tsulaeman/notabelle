angular.module('notes.notestore', [])

.factory('NoteStore', function(){
    //=========== Using local storage to store notes ===============//
        var notes    =   angular.fromJson(window.localStorage['notes'] || '[]');
        
        function persist(){
            window.localStorage['notes']    =   angular.toJson(notes);
        }
    //=========== End Local Storage ===============//
        return {
            list:  function(){
              return notes;  
            },
            
            get: function(noteId){
                        //==== Get the item whose id === noteId
                        for (var i = 0; i < notes.length; i++){
                            if(notes[i].id == noteId){
                                //console.log(notes[i]);
                                return notes[i];
                            }
                        }
                        return undefined;
            },
            
            update: function(note){
                    //==== Get the item whose id === noteId
                    for (var i = 0; i < notes.length; i++){
                        if(notes[i].id == note.id){
                            persist();
                            return;
                        }
                    }
            },
            
            create: function(note){
                    notes.push(note);
                    persist();
                },
                
            delete: function(noteId){
                    for (var i = 0; i < notes.length; i++){
                        if(notes[i].id == noteId){
                            notes.splice(i, 1);
                            persist();
                        }
                    }
                },
            move:   function(note, fromIndex, toIndex){
                notes.splice(fromIndex, 1);
                notes.splice(toIndex, 0, note);
                persist();
            }
        }
    });