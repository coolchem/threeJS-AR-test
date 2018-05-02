export const Errors = {

    ERROR_REGISTERING_ACTION_NAME_NOT_TYPE_STRING: "Error registering action: The action name should be of type string",
    ERROR_REGISTERING_ACTION_HANDLER_NOT_TYPE_FUNCTION: "Error registering action: The handler should be of type function",
    ERROR_REGISTERING_ACTION_NO_HANDLER_GIVEN: "Error registering action: No Handler provided while registering to action",
    ERROR_REGISTERING_ACTION_ONLY_ONE_HANDLER_ALLOWED: "Error registering action: Handler already registered for the action." +
    "Only one handler allowed per action",

    ERROR_UNREGISTERING_ACTION_NAME_NOT_TYPE_STRING: "Error un-registering action: The event name should be of type string",
    ERROR_UNREGISTERING_ACTION_HANDLER_NOT_TYPE_FUNCTION: "Error un-registering action: The callback should be of type function",
    ERROR_UNREGISTERING_ACTION_NO_HANDLER_GIVEN: "Error un-registering action: No Handler set while subscribing to event",

    ERROR_TAKING_ACTION_ACTION_NAME_NOT_TYPE_STRING: "Error taking Action: The action name should be of type string",
    ERROR_TAKING_ACTION_NO_HANDLER_REGISTERED: "Error taking Action: No handler registered for the action",

    ERROR_SUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING: "Error subscribing to Event: The event name should be of type string",
    ERROR_SUBSCRIBING_HANDLER_NOT_TYPE_FUNCTION: "Error subscribing to Event: The callback should be of type function",

    ERROR_UNSUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING: "Error unsubscribing the Event: The event name should be of type string",
    ERROR_UNSUBSCRIBING_HANDLER_NOT_TYPE_FUNCTION: "Error unsubscribing the Event: The callback should be of type function",

    ERROR_PUBLISHING_EVENT_NAME_NOT_TYPE_STRING: "Error publishing the Event: The event name should be of type string",

    ERROR_NO_HANDLER_WHILE_SUBSCRIBING: "Error subscribing to Event: No Handler set while subscribing to event",
    ERROR_NO_HANDLER_WHILE_UNSUBSCRIBING: "Error unsubscribing the Event: No Handler set while unsubscribing the event",
};