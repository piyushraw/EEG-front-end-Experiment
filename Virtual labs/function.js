

  function uuidv4() {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);

    });
  }


  instance = jsPlumb.getInstance({});

  instance.setContainer("diagram");
  instance.bind("ready", function () {

    instance.registerConnectionTypes({

      "red-connection": {
        paintStyle: {stroke: "red", strokeWidth: 5},
        hoverPaintStyle: {stroke: "red", strokeWidth: 10},
        connector: "Flowchart"
      }
    });

    instance.addEndpoint("control15", {

      endpoint: "Dot",  // rectangle, blank, image
      anchor: ["RightMiddle"],
      isSource: true,
      connectionType: "red-connection"
    });


    instance.addEndpoint("control10", {

      endpoint: "Dot",
      anchor: ["LeftMiddle"],
      isTarget: true,
      connectionType: "red-connection"
    });

    instance.bind("contextmenu", function (component, event) {

      if (component.hasClass("jtk-connector")) {
        
        event.preventDefault();
        window.selectedConnection = component;
        $("<div class='custom-menu'><button class='delete-connection'>Delete connection</button></div>")
          .appendTo("body")
          .css({top: event.pageY + "px", left: event.pageX + "px"});
      }
    });

    $("body").on("click", ".delete-connection", function (event) {

      instance.deleteConnection(window.selectedConnection);
    });

    $(document).bind("click", function (event) {


      $("div.custom-menu").remove();
    });

    $("body").on("contextmenu", "#diagram .control", function (event) {
      event.preventDefault();
      window.selectedControl = $(this).attr("id");
      $("<div class='custom-menu'><button class='delete-control'>Delete control</button></div>")
        .appendTo("body")
        .css({top: event.pageY + "px", left: event.pageX + "px"});
    });

    $("body").on("click", ".delete-control", function (event) {
      instance.remove(window.selectedControl);
    });

    $("#diagram").droppable({

      drop: function(event, ui) {
        var id = uuidv4();
        var clone = $(ui.helper).clone(true);
        clone.attr("id", id);
        clone.appendTo(this);
        instance.draggable(id, {containment: true});

        instance.addEndpoint(id, {

          endpoint: "Dot",
          anchor: ["RightMiddle"],
          isSource: true,
          connectionType: "red-connection"
        });

        instance.addEndpoint(id, {

          endpoint: "Dot",
          anchor: ["LeftMiddle"],
          isTarget: true,
          connectionType: "red-connection"
        });
      }
    })

  });
