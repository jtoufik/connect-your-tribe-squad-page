addEventListener('click', (event) => {
    const { target } = event
    if (!target.matches('button') || !target.id) return
    if (!target.id === 'toggle-button') return
    
    const element = document.getElementsByClassName('filter-box')[0]
    element.classList.toggle('collapsed')
})
