# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
import json
from datetime import datetime


from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_list_menu"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
    
        with open("menu.json", "r") as file:
            menu_json = json.load(file)
            menu = menu_json["items"]
            message = "Here's our menu:\n"
            for item in menu:
                message += f"- {item['name']}, price: ${item['price']}\n"
            dispatcher.utter_message(text=message)
        return []
    
class ActionOrderItem(Action):

    def name(self) -> Text:
        return "action_order_item"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        with open("menu.json", "r") as file:
            menu_json = json.load(file)
            menu = menu_json["items"]
            entities = tracker.latest_message.get('entities', [])
            menu_item = next((entity["value"] for entity in entities if entity["entity"] == "menu_item"), None)

            if menu_item:
                selected_item = next((item for item in menu if item['name'].lower() == menu_item.lower()), None)
                if selected_item:
                    response = f"Here are the details for ordered {selected_item['name'].lower()}:\n" \
                            f"Price: {selected_item['price']}\n" \
                            f"The dish will be ready in: {selected_item['preparation_time']} hours"
                    dispatcher.utter_message(text=response)
                else:
                    dispatcher.utter_message(text="Sorry, that menu item is not available.")
            else:
                dispatcher.utter_message(text="Please provide a valid menu item.")

        return []
    
class ActionCheckRestaurantAvailability(Action):
    def name(self) -> Text:
        return "action_check_restaurant_availability"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        entities = tracker.latest_message.get('entities', [])
        day_entity = next((entity["value"] for entity in entities if entity["entity"] == "day"), None)
        time_entity = next((entity["value"] for entity in entities if entity["entity"] == "time"), None)

        if day_entity and time_entity:
            try:
                time = datetime.strptime(time_entity, "%H:%M").time()
            except ValueError:
                dispatcher.utter_message("I'm sorry, I didn't understand the time format.")
                return []

            if is_restaurant_open(day_entity, time):
                dispatcher.utter_message("The restaurant is open on {} at {}.".format(day_entity, time_entity))
            else:
                dispatcher.utter_message("The restaurant is closed on {} at {}.".format(day_entity, time_entity))
        else:
            dispatcher.utter_message("Please provide both a day and a time for me to check.")

        return []

def is_restaurant_open(day: str, time: datetime.time) -> bool:
    with open("opening_hours.json", "r") as file:
            opening_hours_json = json.load(file)
            opening_hours = opening_hours_json["items"]
            if day.lower() in opening_hours:
                try:
                   open_hour = opening_hours[day.lower()]["open"]
                   close_hour = opening_hours[day.lower()]["close"]
                   if open_hour <= time.hour < close_hour:
                        return True
                except KeyError:
                    return False 
                
    return False

class ActionRestaurantHours(Action):

    def name(self) -> Text:
        return "action_provide_restaurant_hours"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
    
        with open("opening_hours.json", "r") as file:
            opening_hours_json = json.load(file)
            opening_hours = opening_hours_json["items"]
            message = "Here's our opening hours:\n"
            for day, hours in opening_hours.items():
                message += f"Day: {day.capitalize()}\n"
                message += f"Opening Hours: {hours['open']} - {hours['close']}\n"
            dispatcher.utter_message(text=message)
        return []
