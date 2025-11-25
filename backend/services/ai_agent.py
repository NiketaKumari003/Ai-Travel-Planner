import os
import re
import random
from typing import Dict, List

AI_API_KEY = os.environ.get('AI_API_KEY', None)

# Intelligent travel knowledge base
TRAVEL_KNOWLEDGE = {
    'destinations': {
        'paris': {
            'best_time': 'April-June and September-October for pleasant weather',
            'attractions': ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées', 'Montmartre'],
            'food': ['Croissants', 'French pastries', 'Wine', 'Cheese', 'Escargot'],
            'budget': 'Mid-range: €80-150/day, Budget: €50-80/day, Luxury: €200+/day',
            'tips': 'Learn basic French phrases, validate metro tickets, dress elegantly'
        },
        'tokyo': {
            'best_time': 'March-May (spring) and September-November (autumn)',
            'attractions': ['Senso-ji Temple', 'Tokyo Skytree', 'Shibuya Crossing', 'Tsukiji Market', 'Imperial Palace'],
            'food': ['Sushi', 'Ramen', 'Tempura', 'Yakitori', 'Mochi'],
            'budget': 'Mid-range: ¥8,000-15,000/day, Budget: ¥5,000-8,000/day, Luxury: ¥20,000+/day',
            'tips': 'Get a JR Pass, bow when greeting, remove shoes indoors, carry cash'
        },
        'london': {
            'best_time': 'May-September for warmer weather',
            'attractions': ['Big Ben', 'Tower of London', 'British Museum', 'London Eye', 'Buckingham Palace'],
            'food': ['Fish and chips', 'Sunday roast', 'Afternoon tea', 'Bangers and mash', 'Shepherd\'s pie'],
            'budget': 'Mid-range: £70-120/day, Budget: £40-70/day, Luxury: £150+/day',
            'tips': 'Stand right on escalators, mind the gap, carry an umbrella, use contactless payment'
        },
        'bali': {
            'best_time': 'April-October (dry season)',
            'attractions': ['Uluwatu Temple', 'Rice terraces', 'Mount Batur', 'Seminyak Beach', 'Ubud Monkey Forest'],
            'food': ['Nasi Goreng', 'Satay', 'Gado-gado', 'Rendang', 'Fresh tropical fruits'],
            'budget': 'Mid-range: $30-60/day, Budget: $15-30/day, Luxury: $80+/day',
            'tips': 'Respect temple dress codes, negotiate prices, rent a scooter, stay hydrated'
        }
    },
    'packing': {
        'europe': {
            'essentials': ['Comfortable walking shoes', 'Layered clothing', 'Rain jacket', 'Universal adapter', 'Passport holder'],
            'clothing': ['Jeans/pants', 'T-shirts', 'Sweater/cardigan', 'Dress/nice shirt', 'Underwear for 7-10 days'],
            'electronics': ['Phone charger', 'Camera', 'Power bank', 'European plug adapter'],
            'documents': ['Passport', 'Travel insurance', 'Hotel confirmations', 'Emergency contacts', 'Copies of important docs']
        },
        'asia': {
            'essentials': ['Lightweight clothing', 'Sunscreen', 'Insect repellent', 'Comfortable sandals', 'Quick-dry towel'],
            'clothing': ['Cotton t-shirts', 'Shorts', 'Long pants', 'Light jacket', 'Swimwear'],
            'electronics': ['Universal adapter', 'Waterproof phone case', 'Portable fan', 'Power bank'],
            'health': ['First aid kit', 'Prescription medications', 'Hand sanitizer', 'Probiotics']
        }
    },
    'budget_tips': [
        'Book flights 6-8 weeks in advance for best prices',
        'Use public transportation instead of taxis',
        'Eat at local markets and street food stalls',
        'Stay in hostels or budget hotels',
        'Look for free walking tours and museum days',
        'Travel during shoulder seasons for lower prices',
        'Use travel reward credit cards',
        'Book accommodations with kitchen facilities'
    ],
    'general_tips': [
        'Always have travel insurance',
        'Make copies of important documents',
        'Notify your bank of travel plans',
        'Research local customs and etiquette',
        'Learn basic phrases in the local language',
        'Keep emergency cash in multiple places',
        'Download offline maps and translation apps',
        'Pack light and leave room for souvenirs'
    ]
}

def extract_keywords(message: str) -> List[str]:
    """Extract relevant keywords from user message"""
    message_lower = message.lower()
    keywords = []
    
    # Destination keywords
    destinations = ['paris', 'tokyo', 'london', 'bali', 'europe', 'asia', 'japan', 'france', 'england', 'indonesia']
    for dest in destinations:
        if dest in message_lower:
            keywords.append(dest)
    
    # Topic keywords
    topics = ['pack', 'packing', 'budget', 'cost', 'money', 'food', 'eat', 'attraction', 'visit', 'weather', 'time', 'season']
    for topic in topics:
        if topic in message_lower:
            keywords.append(topic)
    
    return keywords

def generate_intelligent_response(message: str, user_id: int = None) -> str:
    """Generate contextual travel advice based on user message"""
    keywords = extract_keywords(message)
    message_lower = message.lower()
    
    # Packing advice
    if any(word in message_lower for word in ['pack', 'packing', 'bring', 'luggage', 'suitcase']):
        if 'europe' in message_lower:
            packing_info = TRAVEL_KNOWLEDGE['packing']['europe']
            return f"🎒 **Packing for Europe - Essential Guide**\n\n" \
                   f"**Must-Have Items:**\n• {chr(10).join(packing_info['essentials'])}\n\n" \
                   f"**Clothing Essentials:**\n• {chr(10).join(packing_info['clothing'])}\n\n" \
                   f"**Electronics & Documents:**\n• {chr(10).join(packing_info['electronics'])}\n• {chr(10).join(packing_info['documents'])}\n\n" \
                   f"💡 **Pro Tip:** Pack layers for changing weather and comfortable shoes for lots of walking!"
        
        elif 'asia' in message_lower:
            packing_info = TRAVEL_KNOWLEDGE['packing']['asia']
            return f"🎒 **Packing for Asia - Tropical Essentials**\n\n" \
                   f"**Must-Have Items:**\n• {chr(10).join(packing_info['essentials'])}\n\n" \
                   f"**Clothing for Hot Climate:**\n• {chr(10).join(packing_info['clothing'])}\n\n" \
                   f"**Health & Electronics:**\n• {chr(10).join(packing_info['health'])}\n• {chr(10).join(packing_info['electronics'])}\n\n" \
                   f"🌴 **Pro Tip:** Pack light, breathable fabrics and always carry sunscreen!"
        
        else:
            return f"🎒 **Smart Packing Tips**\n\n" \
                   f"**Universal Essentials:**\n• Comfortable walking shoes\n• Weather-appropriate clothing\n• Universal power adapter\n• First aid kit\n• Copies of important documents\n\n" \
                   f"**Packing Strategy:**\n• Roll clothes to save space\n• Pack one week's worth, do laundry\n• Bring versatile pieces that mix and match\n• Leave 25% of suitcase empty for souvenirs\n\n" \
                   f"💡 **Pro Tip:** Check airline baggage restrictions and weather forecast before packing!"
    
    # Budget advice
    elif any(word in message_lower for word in ['budget', 'cost', 'money', 'cheap', 'expensive', 'price']):
        tips = random.sample(TRAVEL_KNOWLEDGE['budget_tips'], 4)
        return f"💰 **Smart Budget Travel Tips**\n\n" \
               f"**Money-Saving Strategies:**\n• {chr(10).join(tips)}\n\n" \
               f"**Daily Budget Estimates:**\n• Budget Travel: $30-60/day\n• Mid-range: $60-120/day\n• Luxury: $150+/day\n\n" \
               f"💡 **Pro Tip:** Use budget tracking apps and set daily spending limits to stay on track!"
    
    # Destination-specific advice
    elif any(dest in message_lower for dest in ['paris', 'france']):
        info = TRAVEL_KNOWLEDGE['destinations']['paris']
        return f"🇫🇷 **Paris Travel Guide**\n\n" \
               f"**Best Time to Visit:** {info['best_time']}\n\n" \
               f"**Must-See Attractions:**\n• {chr(10).join(info['attractions'])}\n\n" \
               f"**Local Cuisine:**\n• {chr(10).join(info['food'])}\n\n" \
               f"**Budget Guide:** {info['budget']}\n\n" \
               f"**Local Tips:** {info['tips']}\n\n" \
               f"🥐 **Pro Tip:** Visit museums on first Sunday mornings for free entry!"
    
    elif any(dest in message_lower for dest in ['tokyo', 'japan']):
        info = TRAVEL_KNOWLEDGE['destinations']['tokyo']
        return f"🇯🇵 **Tokyo Travel Guide**\n\n" \
               f"**Best Time to Visit:** {info['best_time']}\n\n" \
               f"**Must-See Attractions:**\n• {chr(10).join(info['attractions'])}\n\n" \
               f"**Local Cuisine:**\n• {chr(10).join(info['food'])}\n\n" \
               f"**Budget Guide:** {info['budget']}\n\n" \
               f"**Cultural Tips:** {info['tips']}\n\n" \
               f"🍜 **Pro Tip:** Try different ramen shops - each has its unique style!"
    
    elif any(dest in message_lower for dest in ['london', 'england', 'uk']):
        info = TRAVEL_KNOWLEDGE['destinations']['london']
        return f"🇬🇧 **London Travel Guide**\n\n" \
               f"**Best Time to Visit:** {info['best_time']}\n\n" \
               f"**Must-See Attractions:**\n• {chr(10).join(info['attractions'])}\n\n" \
               f"**Local Cuisine:**\n• {chr(10).join(info['food'])}\n\n" \
               f"**Budget Guide:** {info['budget']}\n\n" \
               f"**Local Tips:** {info['tips']}\n\n" \
               f"☂️ **Pro Tip:** Many museums are free, including the British Museum and Tate Modern!"
    
    elif any(dest in message_lower for dest in ['bali', 'indonesia']):
        info = TRAVEL_KNOWLEDGE['destinations']['bali']
        return f"🇮🇩 **Bali Travel Guide**\n\n" \
               f"**Best Time to Visit:** {info['best_time']}\n\n" \
               f"**Must-See Attractions:**\n• {chr(10).join(info['attractions'])}\n\n" \
               f"**Local Cuisine:**\n• {chr(10).join(info['food'])}\n\n" \
               f"**Budget Guide:** {info['budget']}\n\n" \
               f"**Local Tips:** {info['tips']}\n\n" \
               f"🏄‍♂️ **Pro Tip:** Sunrise at Mount Batur is unforgettable - book a guided trek!"
    
    # Food recommendations
    elif any(word in message_lower for word in ['food', 'eat', 'restaurant', 'cuisine']):
        return f"🍽️ **Foodie Travel Tips**\n\n" \
               f"**Finding Great Local Food:**\n• Follow locals to busy street food stalls\n• Ask hotel staff for recommendations\n• Use apps like Yelp or local equivalents\n• Visit local markets for fresh ingredients\n\n" \
               f"**Food Safety Tips:**\n• Drink bottled or filtered water\n• Eat at busy places with high turnover\n• Be cautious with raw foods in some regions\n• Try local specialties gradually\n\n" \
               f"🌶️ **Pro Tip:** Food tours are great for trying multiple dishes safely while learning about culture!"
    
    # General travel advice
    elif any(word in message_lower for word in ['tip', 'advice', 'help', 'travel', 'trip']):
        tips = random.sample(TRAVEL_KNOWLEDGE['general_tips'], 4)
        return f"✈️ **Essential Travel Wisdom**\n\n" \
               f"**Smart Travel Tips:**\n• {chr(10).join(tips)}\n\n" \
               f"**Before You Go:**\n• Research visa requirements\n• Check vaccination needs\n• Set up international phone plan\n• Download useful travel apps\n\n" \
               f"🌍 **Pro Tip:** The best travel experiences often come from being open to unexpected adventures!"
    
    # Weather/timing questions
    elif any(word in message_lower for word in ['weather', 'time', 'season', 'when']):
        return f"🌤️ **Best Travel Timing Guide**\n\n" \
               f"**Shoulder Season Benefits:**\n• Lower prices on flights and hotels\n• Fewer crowds at attractions\n• Pleasant weather conditions\n• Better service from locals\n\n" \
               f"**Research Before You Go:**\n• Check local weather patterns\n• Consider local holidays and festivals\n• Look up peak tourist seasons\n• Plan for seasonal activities\n\n" \
               f"📅 **Pro Tip:** Book 2-3 months ahead for shoulder season deals!"
    
    # Default helpful response
    else:
        return f"🤖 **AI Travel Assistant Here!**\n\n" \
               f"I'd love to help you plan an amazing trip! I can assist with:\n\n" \
               f"**🎒 Packing Advice** - What to bring for any destination\n" \
               f"**💰 Budget Planning** - Money-saving tips and cost estimates\n" \
               f"**🗺️ Destination Guides** - Best times to visit, attractions, local tips\n" \
               f"**🍽️ Food Recommendations** - Local cuisine and dining tips\n" \
               f"**📅 Travel Timing** - When to visit for best weather and prices\n\n" \
               f"Just ask me something like:\n• 'What should I pack for Europe?'\n• 'Best time to visit Japan?'\n• 'Budget tips for Southeast Asia?'\n\n" \
               f"✨ **Ready to help plan your next adventure!**"

def ask_ai(message: str, user_id: int = None):
    """Main AI function that generates intelligent travel responses"""
    try:
        return generate_intelligent_response(message, user_id)
    except Exception as e:
        return f"🤖 **Travel Assistant**\n\nI'm here to help with your travel questions! Try asking about:\n\n• Packing tips for specific regions\n• Budget advice and cost estimates\n• Best times to visit destinations\n• Local food and cultural recommendations\n• General travel planning advice\n\n✈️ What would you like to know about your next adventure?"
