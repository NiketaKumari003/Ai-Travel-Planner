from fastapi import APIRouter, Query
router = APIRouter()

@router.get('/search-destination')
def search_destination(q: str = Query(..., min_length=1)):
    # Mock suggestions — replace with places API
    suggestions = [
        q + ' City',
        q + ' Beach',
        q + ' National Park',
        'Greater ' + q.capitalize()
    ]
    return {'query': q, 'suggestions': suggestions}
