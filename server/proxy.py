from swiftshadow import QuickProxy
from swiftshadow.classes import ProxyInterface  

# Get a proxy quickly
proxy = QuickProxy(countries=["US"], protocol="http")
print(proxy)

Use ProxyInterface for more control
proxy_manager = ProxyInterface(countries=["US"], protocol="http", autoRotate=True)
print(proxy_manager.get().as_string())